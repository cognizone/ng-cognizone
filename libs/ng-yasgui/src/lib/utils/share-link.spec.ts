/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { createHost, IMG, injected, loadYasguiBundle, sparqlJson, stubAjax } from '../../testing/yasgui-bundle';
import { hardenYasgui } from './harden-yasgui';
import { restrictShareLinkInUrl, restrictShareLinkParams } from './share-link';

const QUERY = 'SELECT * WHERE { ?s ?p ?o }';
const settingsParam = (settings: unknown): string => `outputSettings=${encodeURIComponent(JSON.stringify(settings))}`;
/** As the client writes a share link: a space is a + */
const clientParam = (settings: unknown): string => settingsParam(settings).replace(/%20/g, '+');
const PIVOT = { pivotTable: { rows: ['s'], cols: [], rendererName: 'Table Barchart', aggregatorName: 'Count', vals: [] } };
const settingsOf = (params: string): unknown => JSON.parse(new URLSearchParams(params).get('outputSettings')!);

describe('restrictShareLinkParams', () => {
  it.each([
    '',
    'query=SELECT%20*&tabTitle=Query',
    'query=a=b&&x',
    'outputSettingsX=%7B%22datatable%22%3A1%7D',
    'xoutputSettings=%7B%22datatable%22%3A1%7D',
    'outputSettings',
  ])('leaves %j as it is', params => {
    expect(restrictShareLinkParams(params)).toBe(params);
  });

  it.each([
    ['table options', { datatable: { language: { info: IMG } }, mergeLabelsWithUris: IMG, fetchTitlesFromPreflabel: true }],
    ['renderers', { getCellContent: 1, getColumns: 1, formatPopup: IMG, missingPopupMsg: IMG }],
    ['an array', [{ chartConfig: {} }]],
    ['a string', 'chartConfig'],
    ['null', null],
    ['an empty object', {}],
    ['a chart configuration that is not an object', { chartConfig: IMG, motionChartState: { a: 1 }, pivotTable: [IMG] }],
  ])('drops outputSettings with %s', (_, settings) => {
    expect(restrictShareLinkParams(`query=a&${settingsParam(settings)}&tabTitle=b`)).toBe('query=a&tabTitle=b');
  });

  it.each([
    ['invalid json', 'outputSettings=%7Bnot-json'],
    ['a malformed encoding', 'outputSettings=%E0%A4%A'],
    ['no value', 'outputSettings='],
  ])('drops outputSettings with %s', (_, param) => {
    expect(restrictShareLinkParams(`query=a&${param}`)).toBe('query=a');
  });

  it('keeps a chart configuration, without the options that render html', () => {
    const chartConfig = {
      chartType: 'Table',
      options: { allowHtml: true, title: IMG, tooltip: { isHtml: true, trigger: 'focus' }, series: [{ tooltip: { isHtml: true } }] },
    };
    const params = restrictShareLinkParams(settingsParam({ chartConfig, motionChartState: '{"x":1}', datatable: {} }));

    expect(settingsOf(params)).toEqual({
      chartConfig: { chartType: 'Table', options: { title: IMG, tooltip: { trigger: 'focus' }, series: [{ tooltip: {} }] } },
      motionChartState: '{"x":1}',
    });
  });

  it('keeps the type, options, state and view of a chart configuration only', () => {
    const saved = { chartType: 'LineChart', options: { legend: 'none' }, state: { a: 1 }, view: { columns: [0, 1], rows: [2] } };
    const chartConfig = {
      ...saved,
      dataSourceUrl: 'http://example.org/data',
      query: 'select A',
      refreshInterval: 1,
      dataTable: { cols: [], rows: [] },
      containerId: 'app',
      packages: ['corechart'],
    };

    expect(settingsOf(restrictShareLinkParams(settingsParam({ chartConfig })))).toEqual({ chartConfig: saved });
  });

  it.each(['{"a":1}', { a: 1 }])('keeps a chart state that is %j', state => {
    expect(settingsOf(restrictShareLinkParams(settingsParam({ chartConfig: { state } })))).toEqual({ chartConfig: { state } });
  });

  it('keeps the column and row numbers of a chart view only', () => {
    const tooltip = { calc: 'stringify', sourceColumn: 1, type: 'string', role: 'tooltip', properties: { html: true } };
    const view = { columns: [0, tooltip, '1', 2], rows: [3, { min: 0 }], hiddenColumns: [1] };

    expect(settingsOf(restrictShareLinkParams(settingsParam({ chartConfig: { view } })))).toEqual({
      chartConfig: { view: { columns: [0, 2], rows: [3] } },
    });
  });

  it.each([
    ['a view without rows', { columns: [0] }, { columns: [0] }],
    ['a view with columns that are not a list', { columns: 1, rows: 'a' }, {}],
  ])('keeps %s as such', (_, view, kept) => {
    expect(settingsOf(restrictShareLinkParams(settingsParam({ chartConfig: { view } })))).toEqual({ chartConfig: { view: kept } });
  });

  it('drops the options that render html when given as a path', () => {
    const options = {
      'tooltip.isHtml': true,
      allowHtml: true,
      'cssClassNames.allowHtml': true,
      series: [{ 'tooltip.isHtml': true }],
      'legend.position': 'top',
      isHtmlTitle: 'a',
    };

    expect(settingsOf(restrictShareLinkParams(settingsParam({ chartConfig: { options } })))).toEqual({
      chartConfig: { options: { series: [{}], 'legend.position': 'top', isHtmlTitle: 'a' } },
    });
  });

  it('drops the parts of a chart configuration that have another type', () => {
    const chartConfig = { chartType: { a: 1 }, options: 'allowHtml', state: 1, view: '{"columns":[0]}' };

    expect(settingsOf(restrictShareLinkParams(settingsParam({ chartConfig })))).toEqual({ chartConfig: {} });
  });

  it('keeps the layout of a pivot table only', () => {
    const pivotTable = {
      cols: ['a', 1, IMG],
      rows: 'b',
      vals: ['c'],
      rendererName: 'Heatmap',
      aggregatorName: { a: 1 },
      rendererOptions: { localeStrings: { totals: IMG } },
      localeStrings: { totals: IMG },
      onRefresh: 1,
    };
    const params = restrictShareLinkParams(settingsParam({ pivotTable }));

    expect(settingsOf(params)).toEqual({ pivotTable: { cols: ['a', IMG], rows: [], vals: ['c'], rendererName: 'Heatmap' } });
  });

  it('drops __proto__ at any depth', () => {
    const json = '{"__proto__":{"a":1},"chartConfig":{"__proto__":{"allowHtml":true},"chartType":"Table"}}';
    const settings = settingsOf(restrictShareLinkParams(`outputSettings=${encodeURIComponent(json)}`)) as any;

    expect(JSON.stringify(settings)).toBe('{"chartConfig":{"chartType":"Table"}}');
    expect(Object.getPrototypeOf(settings.chartConfig)).toBe(Object.prototype);
  });

  it('decodes + as a space, as the client does', () => {
    const params = restrictShareLinkParams('outputSettings=%7B%22chartConfig%22:%7B%22chartType%22:%22Bar+Chart%22%7D%7D');

    expect(settingsOf(params)).toEqual({ chartConfig: { chartType: 'Bar Chart' } });
  });

  it.each([
    ['a pivot layout', PIVOT],
    ['a chart', { chartConfig: { chartType: 'Bar Chart', options: { legend: 'none' }, state: {}, view: {} }, motionChartState: '{}' }],
  ])('leaves %s as the client wrote it', (_, settings) => {
    const params = `query=a&${clientParam(settings)}&tabTitle=b`;

    expect(restrictShareLinkParams(params)).toBe(params);
  });

  it('encodes settings again when something is dropped', () => {
    const params = restrictShareLinkParams(clientParam({ pivotTable: { ...PIVOT.pivotTable, localeStrings: {} } }));

    expect(settingsOf(params)).toEqual(PIVOT);
    expect(params).not.toContain('+');
  });

  // the client cuts a value there
  it.each([
    ['=', '%3D'],
    ['#', '%23'],
  ])('encodes settings again when their value has a %s', (char, encoded) => {
    const params = restrictShareLinkParams(`outputSettings=%7B%22chartConfig%22%3A%7B%22chartType%22%3A%22a${char}b%22%7D%7D`);

    expect(params).toBe(`outputSettings=%7B%22chartConfig%22%3A%7B%22chartType%22%3A%22a${encoded}b%22%7D%7D`);
  });

  it('restricts every outputSettings parameter', () => {
    const params = restrictShareLinkParams(
      [
        settingsParam({ chartConfig: { chartType: 'Table' } }),
        'query=a',
        settingsParam({ datatable: {} }),
        settingsParam({ datatable: {} }),
      ].join('&')
    );

    expect(params).toBe(`${settingsParam({ chartConfig: { chartType: 'Table' } })}&query=a`);
  });
});

describe('restrictShareLinkInUrl', () => {
  const unsafe = settingsParam({ datatable: { language: { info: IMG } } });

  afterEach(() => {
    history.replaceState(null, '', '/');
    jest.restoreAllMocks();
  });

  it('restricts the hash and the query string', () => {
    history.replaceState({ navigationId: 3 }, '', `/sparql?id=102&${unsafe}#query=a&${unsafe}&tabTitle=b`);

    restrictShareLinkInUrl();

    expect(window.location.pathname + window.location.search + window.location.hash).toBe('/sparql?id=102#query=a&tabTitle=b');
    expect(history.state).toEqual({ navigationId: 3 });
  });

  it('does not touch a url with settings as the client wrote them', () => {
    const url = `/sparql?id=102#query=a&outputFormat=pivot&${clientParam(PIVOT)}`;
    history.replaceState(null, '', url);
    const replaceState = jest.spyOn(history, 'replaceState');

    restrictShareLinkInUrl();

    expect(replaceState).not.toHaveBeenCalled();
    expect(window.location.pathname + window.location.search + window.location.hash).toBe(url);
  });

  it('rewrites a url with settings of which something is dropped', () => {
    history.replaceState(null, '', `/sparql#query=a&${clientParam({ ...PIVOT, datatable: {} })}`);
    const replaceState = jest.spyOn(history, 'replaceState');

    restrictShareLinkInUrl();

    expect(replaceState).toHaveBeenCalledTimes(1);
    expect(settingsOf(window.location.hash.slice(1))).toEqual(PIVOT);
  });

  /** Names of the parameters the client reads, parsed as its shareLink.js does */
  function namesReadByClient(): string[] {
    const { hash, search } = window.location;
    const params = hash.length > 1 ? hash.split('#')[1] : search.slice(1);
    return params.split('&').map(param => param.split('=')[0]);
  }

  it.each([
    `/sparql#outputSettings=1&#${unsafe}&query=SELECT+1&outputFormat=table`,
    `/sparql?outputSettings=1&?${unsafe}&query=SELECT+1&outputFormat=table`,
    `/sparql#outputSettings=1&#outputSettings=1&#${unsafe}&query=SELECT+1`,
    `/sparql##${unsafe}`,
    `/sparql??${unsafe}`,
  ])('leaves no settings to read in %s, and nothing to restrict again', url => {
    history.replaceState(null, '', url);

    restrictShareLinkInUrl();
    expect(namesReadByClient()).not.toContain('outputSettings');

    const replaceState = jest.spyOn(history, 'replaceState');
    restrictShareLinkInUrl();
    expect(replaceState).not.toHaveBeenCalled();
  });

  it('does not touch a url without unsafe settings', () => {
    history.replaceState(null, '', `/sparql?id=102#query=${encodeURIComponent(QUERY)}&tabTitle=a%20b`);
    const replaceState = jest.spyOn(history, 'replaceState');

    restrictShareLinkInUrl();

    expect(replaceState).not.toHaveBeenCalled();
  });
});

describe('share link in the real client', () => {
  let YASGUI: any;
  let host: HTMLElement;

  /** Opens the client on a share link, answers its query, returns the tab made for the link */
  async function open(output: string, outputSettings: unknown, restrict: boolean): Promise<any> {
    const settings = settingsParam(outputSettings);
    return openHash(`query=${encodeURIComponent(QUERY)}&outputFormat=${output}&${settings}&tabTitle=${encodeURIComponent(IMG)}`, restrict);
  }

  async function openHash(hash: string, restrict: boolean): Promise<any> {
    window.location.hash = hash;
    if (restrict) restrictShareLinkInUrl();
    const ajax = stubAjax(YASGUI);
    host = createHost();
    const tab = YASGUI(host, { yasqe: { sparql: { endpoint: 'http://localhost/sparql' } } }).current();
    // no query when the client finds no link
    if (ajax.queries.length) ajax.respond(sparqlJson([{ s: { type: 'literal', value: 'a' }, p: { type: 'literal', value: 'b' } }]));
    // the pivot table renders after a 10ms timeout
    await new Promise(resolve => setTimeout(resolve, 50));
    return tab;
  }

  beforeAll(() => {
    YASGUI = loadYasguiBundle();
    hardenYasgui(YASGUI);
    // the pivot view otherwise waits for the Google charts loader
    YASGUI.YASR.defaults.useGoogleCharts = false;
  });

  beforeEach(() => localStorage.clear());

  afterEach(() => {
    host.remove();
    window.location.hash = '';
  });

  const table = { datatable: { language: { info: IMG } } };
  const pivot = { pivotTable: { cols: ['s'], rows: ['p'], rendererOptions: { localeStrings: { totals: IMG } } } };

  it.each([
    ['table', table],
    ['pivot', pivot],
  ])('injects markup from the %s settings of an unrestricted link', async (output, settings) => {
    await open(output, settings, false);

    expect(injected(host).length).toBeGreaterThan(0);
  });

  it('opens a restricted table link without its settings', async () => {
    const tab = await open('table', table, true);

    expect(injected(host)).toEqual([]);
    expect(tab.yasqe.getValue()).toBe(QUERY);
    expect(tab.yasr.options.output).toBe('table');
    expect(tab.yasr.plugins.table.options.datatable.language).toBeUndefined();
    expect(host.querySelectorAll('table.resultsTable tbody tr')).toHaveLength(1);
    expect(host.querySelector('.nav-tabs li.active span')!.textContent).toBe(IMG);
  });

  it('opens a link of which the first settings are dropped without the settings after a second #', async () => {
    const tab = await openHash(`outputSettings=1&#${settingsParam(table)}&query=SELECT+1&outputFormat=table`, true);

    expect(tab.yasr.plugins.table.options.datatable.language).toBeUndefined();
    expect(injected(host)).toEqual([]);
  });

  it('opens a restricted pivot link with its layout', async () => {
    const tab = await open('pivot', pivot, true);

    expect(injected(host)).toEqual([]);
    expect(tab.yasr.options.output).toBe('pivot');
    expect(tab.yasr.plugins.pivot.options.pivotTable.cols).toEqual(['s']);
    expect(tab.yasr.plugins.pivot.options.pivotTable.rows).toEqual(['p']);
    expect(tab.yasr.plugins.pivot.options.pivotTable.rendererOptions).toBeUndefined();
    expect(host.querySelector('.pvtTotalLabel')!.textContent).toBe('Totals');
  });
});
