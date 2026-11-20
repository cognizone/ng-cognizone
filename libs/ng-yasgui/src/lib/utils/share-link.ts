/** Options that make Google charts render cell or tooltip text as HTML, and the key jQuery's extend would use as prototype */
const DROPPED_KEYS = ['allowHtml', 'isHtml', '__proto__'];

const SETTINGS_PARAM = 'outputSettings=';

/** What the client writes in a share link, besides request settings. It sends any parameter it does not know to the endpoint */
const SHARED_PARAMS = ['query', 'outputFormat', 'outputSettings', 'tabTitle', 'namedGraph', 'defaultGraph'];

/** The chart types of the chart editor that draw SVG or text: not Map (HTML info windows), MotionChart (Flash) or the image charts */
const CHART_TYPES = [
  'AnnotationChart',
  'AreaChart',
  'BarChart',
  'BubbleChart',
  'Calendar',
  'CandlestickChart',
  'ColumnChart',
  'ComboChart',
  'Gauge',
  'GeoChart',
  'Histogram',
  'LineChart',
  'OrgChart',
  'PieChart',
  'Sankey',
  'ScatterChart',
  'SteppedAreaChart',
  'Table',
  'Timeline',
  'TreeMap',
  'WordTree',
];

export interface ShareLinkOptions {
  /**
   * Keeps the parameters of a share link that choose where and how its query is sent: `endpoint`, `requestMethod`,
   * `headers`, `contentTypeSelect`, `contentTypeConstruct`, and any parameter the client does not know, which it sends
   * to the endpoint as a request argument. Off by default, as the client runs the query of a link as soon as it opens it.
   */
  keepRequestSettings?: boolean;
}

const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === 'object' && !Array.isArray(v);
const numbers = (v: unknown): number[] | undefined => (Array.isArray(v) ? v.filter(x => typeof x === 'number') : undefined);
const strings = (v: unknown): string[] => (Array.isArray(v) ? v.filter(x => typeof x === 'string') : []);

function sameJson(a: unknown, b: unknown): boolean {
  if (Array.isArray(a) && Array.isArray(b)) return a.length === b.length && a.every((item, i) => sameJson(item, b[i]));
  if (!isObject(a) || !isObject(b)) return a === b;
  const keys = Object.keys(a);
  return (
    keys.length === Object.keys(b).length && keys.every(key => Object.prototype.hasOwnProperty.call(b, key) && sameJson(a[key], b[key]))
  );
}

/** What a saved chart needs: the other keys of a ChartWrapper (dataSourceUrl, query...) make it load data */
function restrictChartConfig({ chartType, options, state, view }: Record<string, unknown>): Record<string, unknown> {
  return {
    ...(typeof chartType === 'string' && CHART_TYPES.includes(chartType) && { chartType }),
    ...(isObject(options) && { options }),
    ...((typeof state === 'string' || isObject(state)) && { state }),
    ...(isObject(view) && { view: restrictChartView(view) }),
  };
}

/** Without calculated columns: their role and properties can make one an HTML tooltip */
function restrictChartView(view: Record<string, unknown>): Record<string, unknown> {
  const columns = numbers(view.columns);
  const rows = numbers(view.rows);
  return { ...(columns && { columns }), ...(rows && { rows }) };
}

/**
 * The client merges `outputSettings` of a share link over the options of the selected result view
 * (for the table: `datatable.language`, rendered as HTML). Keeps only what the client itself saves
 * in a share link: Google chart configuration and pivot table layout.
 */
function restrictOutputSettings(json: string): Record<string, unknown> | undefined {
  let settings: unknown;
  try {
    // Google charts also takes an option as a path: 'tooltip.isHtml'
    settings = JSON.parse(json, (key, value) => (DROPPED_KEYS.some(name => key === name || key.endsWith(`.${name}`)) ? undefined : value));
  } catch {
    return undefined;
  }
  if (!isObject(settings)) return undefined;

  const safe: Record<string, unknown> = {};
  if (isObject(settings.chartConfig)) safe.chartConfig = restrictChartConfig(settings.chartConfig);
  if (typeof settings.motionChartState === 'string') safe.motionChartState = settings.motionChartState;
  if (isObject(settings.pivotTable)) {
    // other pivot options (rendererOptions.localeStrings...) end up as HTML
    const { cols, rows, vals, rendererName, aggregatorName } = settings.pivotTable;
    safe.pivotTable = {
      cols: strings(cols),
      rows: strings(rows),
      vals: strings(vals),
      ...(typeof rendererName === 'string' && { rendererName }),
      ...(typeof aggregatorName === 'string' && { aggregatorName }),
    };
  }
  return Object.keys(safe).length ? safe : undefined;
}

function restrictSettingsParam(param: string): string | null {
  const value = param.slice(SETTINGS_PARAM.length);
  let json: string;
  try {
    // same decoding as the client
    json = decodeURIComponent(value.replace(/\+/g, ' '));
  } catch {
    return null;
  }
  const safe = restrictOutputSettings(json);
  if (!safe) return null;
  // the client cuts a value at = or #, and would not read what was checked
  if (!/[=#]/.test(value) && sameJson(safe, JSON.parse(json))) return param;
  return SETTINGS_PARAM + encodeURIComponent(JSON.stringify(safe));
}

/** The client opens a link that has a query. Also counts one after a # or ?, which a later restriction can make the first */
const isLink = (params: string): boolean => /(^|[&#?])query=[^&#]/.test(params);

function restrictParam(param: string, link: boolean, { keepRequestSettings }: ShareLinkOptions): string | null {
  if (param.startsWith(SETTINGS_PARAM)) return restrictSettingsParam(param);
  if (!link || keepRequestSettings === true) return param;
  // the client compares the name as it is, not decoded
  return SHARED_PARAMS.includes(param.split('=')[0]) ? param : null;
}

/**
 * For example 'query=SELECT...&outputSettings=%7B"datatable":1%7D&endpoint=https://example.org' -> 'query=SELECT...'.
 * Parameters without a query are not a link: they stay, as the app may use them, apart from `outputSettings`.
 */
export function restrictShareLinkParams(params: string, options: ShareLinkOptions = {}): string {
  const link = isLink(params);
  return params
    .split('&')
    .map(param => restrictParam(param, link, options))
    .filter(param => param !== null)
    .join('&');
}

function restrictUrl(url: URL, options: ShareLinkOptions): boolean {
  const hash = restrictShareLinkParams(url.hash.slice(1), options);
  const search = restrictShareLinkParams(url.search.slice(1), options);
  if (hash === url.hash.slice(1) && search === url.search.slice(1)) return false;

  // prefixed: the setters strip one leading # or ? of what is left
  url.hash = hash && `#${hash}`;
  url.search = search && `?${search}`;
  return true;
}

/**
 * The client reads the share link from the hash, or else the query string, when it is created.
 * The client given by `YasguiService.loadYasgui()` calls this each time it is created.
 */
export function restrictShareLinkInUrl(options: ShareLinkOptions = {}): void {
  const url = new URL(window.location.href);
  let changed = false;
  // until nothing is dropped any more, so that what is left reads the same when restricted again
  while (restrictUrl(url, options)) changed = true;
  if (changed) history.replaceState(history.state, '', url.toString());
}

/** The client, restricting the share link in the url before each creation. `options` is read then */
export function restrictShareLinkOnCreate<T extends object>(yasgui: T, options: () => ShareLinkOptions): T {
  return new Proxy(yasgui, {
    apply: (target, thisArg, args) => {
      restrictShareLinkInUrl(options());
      return Reflect.apply(target as (...params: unknown[]) => unknown, thisArg, args);
    },
    construct: (target, args) => {
      restrictShareLinkInUrl(options());
      return Reflect.construct(target as new (...params: unknown[]) => object, args);
    },
  });
}
