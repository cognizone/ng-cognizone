/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import {
  DOUBLE_QUOTE,
  drawResponse,
  IMG,
  injected,
  LINE_SEPARATOR,
  loadYasguiBundle,
  PAYLOADS,
  SCRIPT,
  SINGLE_QUOTE,
  sparqlJson,
  stubGoogleCharts,
  TestRow,
  watchInnerHtml,
} from '../../testing/yasgui-bundle';
import { hardenYasgui } from './harden-yasgui';

const POINT = { type: 'literal', value: 'POINT(4.35 50.85)' };
const XSD_INTEGER = 'http://www.w3.org/2001/XMLSchema#integer';

describe('hardenYasgui', () => {
  let YASGUI: any;
  let host: HTMLElement;
  let sinks: ReturnType<typeof watchInnerHtml>;

  function draw(bindings: TestRow[], options: Record<string, unknown> = {}, vars?: string[]): void {
    ({ host } = drawResponse(YASGUI, sparqlJson(bindings, vars), options));
  }

  /** Data cells of a result row, without the row number */
  const cells = (row: number = 0): HTMLElement[] =>
    Array.from(host.querySelectorAll<HTMLElement>(`table.resultsTable tbody tr:nth-child(${row + 1}) td`)).slice(1);

  /** The chart view warns about a variable with values of several types */
  function drawChartWarning(variable: string): void {
    stubGoogleCharts();
    draw([{ [variable]: { type: 'literal', value: '1', datatype: XSD_INTEGER } }, { [variable]: { type: 'literal', value: 'a' } }], {
      output: 'gchart',
      useGoogleCharts: true,
    });
  }

  function openPopup(): HTMLElement | null {
    host.querySelector<HTMLElement>('.leaflet-marker-icon')?.click();
    return host.querySelector<HTMLElement>('.leaflet-popup-content');
  }

  beforeEach(() => (sinks = watchInnerHtml()));

  afterEach(() => {
    sinks.stop();
    host?.remove();
    delete (window as any).google;
  });

  describe('stock bundle', () => {
    beforeAll(() => (YASGUI = loadYasguiBundle()));

    it('injects markup from a uri, a language tag, a datatype and a variable name into the table', () => {
      draw(
        [
          {
            uri: { type: 'uri', value: `http://example.org/${SINGLE_QUOTE}` },
            lang: { type: 'literal', value: 'x', 'xml:lang': `en${IMG}` },
            typed: { type: 'literal', value: 'x', datatype: `http://example.org/${IMG}` },
          },
        ],
        {},
        ['uri', 'lang', 'typed', `v${IMG}`]
      );

      expect(injected(host)).toHaveLength(4);
    });

    it('injects markup from a label into the map popup', () => {
      draw([{ geo: POINT, geoLabel: { type: 'literal', value: IMG } }], { output: 'leaflet' });

      expect(injected(openPopup()!)).toHaveLength(1);
    });

    it('injects markup from a variable name into the chart warning', () => {
      drawChartWarning(`v${IMG}`);

      expect(injected(host.querySelector('.toggableMsg')!)).toHaveLength(1);
    });

    it('turns markup in an attribute value of a cell into an element when it builds the search data', () => {
      const { defaults } = YASGUI.YASR.plugins.table;
      const { getCellContent } = defaults;
      defaults.getCellContent = (_yasr: unknown, _plugin: unknown, row: TestRow): string => {
        const link = document.createElement('a');
        link.title = link.textContent = String(row.s.value);
        return link.outerHTML;
      };

      try {
        draw([{ s: { type: 'uri', value: LINE_SEPARATOR } }]);
      } finally {
        defaults.getCellContent = getCellContent;
      }

      expect(injected(host)).toEqual([]);
      expect(sinks.injected()).toHaveLength(1);
    });
  });

  describe('hardened bundle', () => {
    beforeAll(() => {
      YASGUI = loadYasguiBundle();
      hardenYasgui(YASGUI);
    });

    describe('table', () => {
      it.each(PAYLOADS)('shows %s as text wherever it is in a result', payload => {
        draw(
          [
            {
              uri: { type: 'uri', value: `http://example.org/${payload}` },
              scheme: { type: 'uri', value: `javascript:${payload}` },
              literal: { type: 'literal', value: payload },
              lang: { type: 'literal', value: payload, 'xml:lang': payload },
              typed: { type: 'typed-literal', value: payload, datatype: payload },
              bnode: { type: 'bnode', value: payload },
              type: { type: payload, value: payload, [payload]: payload },
            },
          ],
          {},
          ['uri', 'scheme', 'literal', 'lang', 'typed', 'bnode', 'type', payload]
        );

        expect(injected(host)).toEqual([]);
        expect(sinks.injected()).toEqual([]);
        expect(cells()[0].textContent).toBe(`http://example.org/${payload}`);
        expect(cells()[3].textContent).toBe(`"${payload}"@${payload}`);
        expect(cells()[4].textContent).toBe(`"${payload}"^^<${payload}>`);
        expect(host.querySelector('thead')!.textContent).toContain(payload);
      });

      it.each(['http://example.org/a?b=1&c=2', 'https://example.org/a', 'HTTPS://example.org/a', 'mailto:someone@example.org'])(
        'links %s',
        uri => {
          draw([{ s: { type: 'uri', value: uri } }]);

          const link = cells()[0].querySelector('a')!;
          expect(link.getAttribute('href')).toBe(uri);
          expect(link.textContent).toBe(uri);
          expect(link.className).toBe('uri');
          expect(link.target).toBe('_blank');
        }
      );

      it.each([
        'javascript:alert(1)',
        'JaVaScRiPt:alert(1)',
        ' javascript:alert(1)',
        'java\tscript:alert(1)',
        '\u0001javascript:alert(1)',
        'data:text/html,<script>alert(1)</script>',
        'vbscript:msgbox(1)',
        'urn:uuid:6e8bc430-9c3a-11d9-9669-0800200c9a66',
        'ftp://example.org/a',
        'tel:+41000000000',
        '//example.org/a',
        '',
      ])('shows %j as text with the style of a uri, not as a link', uri => {
        draw([{ s: { type: 'uri', value: uri } }]);

        expect(host.querySelector('table.resultsTable a')).toBeNull();
        expect(cells()[0].textContent).toBe(uri);
        expect(cells()[0].querySelector('span')!.className).toBe('uri');
      });

      it('keeps a quote in a uri inside the href', () => {
        const uri = `http://example.org/${SINGLE_QUOTE}${DOUBLE_QUOTE}`;
        draw([{ s: { type: 'uri', value: uri } }]);

        const link = cells()[0].querySelector('a')!;
        expect(link.getAttribute('href')).toBe(uri);
        expect(link.getAttributeNames().sort()).toEqual(['class', 'href', 'rel', 'target']);
      });

      it('escapes markup characters and line breaks of a result in a cell and in a column title', () => {
        const { getCellContent, getColumns } = YASGUI.YASR.plugins.table.defaults;
        const text = `<>"'&\r\n\u2028\u2029`;
        const escaped = '&#60;&#62;&#34;&#39;&#38;&#13;&#10;&#8232;&#8233;';
        const yasr = { options: { uriTarget: text }, results: { getVariables: () => [text] } };
        const row = { s: { type: 'uri', value: `http://x/${text}` }, sLabel: { type: 'literal', value: text, 'xml:lang': text } };

        expect(getCellContent(yasr, { options: { mergeLabelsWithUris: true } }, row, 's', {})).toBe(
          `<div><a href="http://x/${escaped}" target="${escaped}" rel="noopener" class="uri" title="http://x/${escaped}">` +
            `&#34;${escaped}&#34;<sup>@${escaped}</sup></a></div>`
        );
        expect(getColumns(yasr, { options: {} })[1].title).toBe(`<span>${escaped}</span>`);
      });

      it('uses the link target of the client options', () => {
        draw([{ s: { type: 'uri', value: 'http://example.org/a' } }], { uriTarget: `_self${DOUBLE_QUOTE}` });

        expect(cells()[0].querySelector('a')!.target).toBe(`_self${DOUBLE_QUOTE}`);
        expect(injected(host)).toEqual([]);
      });

      it('shows literals as the stock table does', () => {
        draw([
          {
            plain: { type: 'literal', value: 'a < b & c' },
            lang: { type: 'literal', value: 'chat', 'xml:lang': 'fr' },
            xsd: { type: 'typed-literal', value: '2024-01-01', datatype: 'http://www.w3.org/2001/XMLSchema#date' },
            other: { type: 'literal', value: 'x', datatype: 'http://example.org/type' },
            bnode: { type: 'bnode', value: 'b0' },
          },
        ]);

        expect(cells().map(cell => cell.innerHTML)).toEqual([
          '<div><span class="nonUri">a &lt; b &amp; c</span></div>',
          '<div><span class="nonUri">"chat"<sup>@fr</sup></span></div>',
          '<div><span class="nonUri">"2024-01-01"<sup>^^xsd:date</sup></span></div>',
          '<div><span class="nonUri">"x"<sup>^^&lt;http://example.org/type&gt;</sup></span></div>',
          '<div><span class="nonUri">b0</span></div>',
        ]);
      });

      it('leaves the cell of an unbound variable empty', () => {
        draw([{ a: { type: 'literal', value: 'x' } }], {}, ['a', 'unbound']);

        expect(cells().map(cell => cell.textContent)).toEqual(['x', '']);
      });

      // the bundle itself throws on such results before the table is drawn
      it.each([
        ['a number', 42, '42'],
        ['null', null, ''],
        ['an object', { a: 1 }, '[object Object]'],
      ])('renders %s as value', (_, value, shown) => {
        const yasr = { options: { uriTarget: '_blank' } };
        const render = (type: string): string =>
          YASGUI.YASR.plugins.table.defaults.getCellContent(yasr, { options: {} }, { s: { type, value } }, 's', {});

        expect(render('uri')).toBe(`<div><span class="uri">${shown}</span></div>`);
        expect(render('literal')).toBe(`<div><span class="nonUri">${shown}</span></div>`);
      });

      it('shortens uris with the prefixes of the query', () => {
        const getUsedPrefixes = { ex: 'http://example.org/', amp: 'http://example.org/?a=1&b=', [IMG]: 'http://markup.example.org/' };
        draw(
          [
            { s: { type: 'uri', value: 'http://example.org/thing' } },
            { s: { type: 'uri', value: 'http://example.org/?a=1&b=2' } },
            { s: { type: 'uri', value: 'http://markup.example.org/x' } },
            { s: { type: 'uri', value: 'http://other.example.org/x' } },
          ],
          { getUsedPrefixes }
        );

        expect([0, 1, 2, 3].map(row => cells(row)[0].textContent)).toEqual([
          'ex:thing',
          'ex:?a=1&b=2',
          `${IMG}:x`,
          'http://other.example.org/x',
        ]);
        expect(cells(0)[0].querySelector('a')!.getAttribute('href')).toBe('http://example.org/thing');
        expect(injected(host)).toEqual([]);
      });

      describe('with labels merged into uris', () => {
        beforeAll(() => (YASGUI.YASR.plugins.table.defaults.mergeLabelsWithUris = true));
        afterAll(() => (YASGUI.YASR.plugins.table.defaults.mergeLabelsWithUris = false));

        it('shows the label as link text and hides the label column', () => {
          draw([{ s: { type: 'uri', value: 'http://example.org/a' }, sLabel: { type: 'literal', value: 'Thing', 'xml:lang': 'en' } }]);

          const link = cells()[0].querySelector('a')!;
          expect(cells()).toHaveLength(1);
          expect(link.innerHTML).toBe('"Thing"<sup>@en</sup>');
          expect(link.title).toBe('http://example.org/a');
          expect(link.getAttribute('href')).toBe('http://example.org/a');
        });

        it.each(PAYLOADS)('shows %s in a label as text', payload => {
          draw([
            {
              s: { type: 'uri', value: `http://example.org/${payload}` },
              sLabel: { type: 'literal', value: payload, 'xml:lang': payload },
              t: { type: 'uri', value: `javascript:${payload}` },
              tLabel: { type: 'literal', value: payload, datatype: payload },
            },
          ]);

          expect(injected(host)).toEqual([]);
          expect(sinks.injected()).toEqual([]);
          expect(cells().map(cell => cell.textContent)).toEqual([`"${payload}"@${payload}`, `"${payload}"^^<${payload}>`]);
          expect(cells()[0].querySelector('a')!.title).toBe(`http://example.org/${payload}`);
          expect(cells()[1].querySelector('a')).toBeNull();
        });
      });
    });

    describe('map', () => {
      it.each(PAYLOADS)('shows %s in a popup label as text', payload => {
        draw([{ geo: POINT, geoLabel: { type: 'literal', value: payload } }], { output: 'leaflet' });

        const popup = openPopup()!;
        expect(popup.textContent).toBe(payload);
        expect(injected(host)).toEqual([]);
      });

      it('links a http label', () => {
        draw([{ geo: POINT, geoLabel: { type: 'uri', value: `http://example.org/${DOUBLE_QUOTE}` } }], { output: 'leaflet' });

        const link = openPopup()!.querySelector('a')!;
        expect(link.getAttribute('href')).toBe(`http://example.org/${DOUBLE_QUOTE}`);
        expect(link.textContent).toBe(`http://example.org/${DOUBLE_QUOTE}`);
        expect(injected(host)).toEqual([]);
      });

      it('shows a javascript: label as text', () => {
        draw([{ geo: POINT, geoLabel: { type: 'uri', value: 'javascript:alert(1)' } }], { output: 'leaflet' });

        const popup = openPopup()!;
        expect(popup.textContent).toBe('javascript:alert(1)');
        expect(popup.querySelector('a')).toBeNull();
      });

      it('has no popup without label, and a hint naming the geo variable as text', () => {
        draw([{ [`geo${IMG}`]: POINT }], { output: 'leaflet' });

        expect(openPopup()).toBeNull();
        expect(host.querySelector('.yasr_results small code')!.textContent).toBe(`geo${IMG}Label`);
        expect(injected(host)).toEqual([]);
      });
    });

    // not patched: checks that these views of the bundle need no patch
    describe('pivot view', () => {
      beforeAll(() => (YASGUI.YASR.plugins.pivot.defaults.pivotTable = { cols: ['s'], rows: ['l'] }));
      afterAll(() => (YASGUI.YASR.plugins.pivot.defaults.pivotTable = {}));

      it.each(PAYLOADS)('shows %s as text in headers and variables', async payload => {
        draw(
          [{ s: { type: 'uri', value: `http://example.org/${payload}` }, l: { type: 'literal', value: payload, 'xml:lang': payload } }],
          { output: 'pivot' },
          ['s', 'l', payload]
        );
        // rendered after a 10ms timeout
        await new Promise(resolve => setTimeout(resolve, 50));

        expect(host.querySelector('.pvtColLabel')!.textContent).toBe(`http://example.org/${payload}`);
        expect(host.querySelector('.pvtRowLabel')!.textContent).toBe(payload);
        expect(host.querySelector('.pvtVal')!.textContent).toBe('1');
        expect(host.querySelector('.pvtUnused')!.textContent).toContain(payload);
        expect(injected(host)).toEqual([]);
        expect(sinks.injected()).toEqual([]);
      });
    });

    describe('rawResponse view', () => {
      it.each(PAYLOADS)('shows %s as text', payload => {
        draw(
          [{ s: { type: 'uri', value: `http://example.org/${payload}` }, l: { type: 'literal', value: payload, 'xml:lang': payload } }],
          { output: 'rawResponse' },
          ['s', 'l', payload]
        );

        expect(host.querySelector('.yasr_results')!.children.length).toBeGreaterThan(0);
        expect(injected(host)).toEqual([]);
        expect(sinks.injected()).toEqual([]);
      });
    });

    describe('chart', () => {
      it.each(PAYLOADS)('shows %s in a variable name as text in the warning', payload => {
        drawChartWarning(`v${payload}`);

        const warning = host.querySelector('.toggableMsg')!;
        expect(warning.textContent).toBe(
          `Conflicting data types found for variable v${payload}. Assuming all values of this variable are "string". ` +
            'As a result, several Google Charts will not render values of this particular variable. ' +
            'To avoid this issue, cast the values in your SPARQL query to the intended xsd datatype'
        );
        expect(warning.querySelector('i')!.textContent).toBe(`v${payload}`);
        expect(injected(host)).toEqual([]);
        expect(sinks.injected()).toEqual([]);
      });

      it('keeps the defaults of the chart view', () => {
        expect(YASGUI.YASR.plugins.gchart.defaults.persistencyId).toBe('gchart');
      });
    });

    it('shows an error response as text', () => {
      ({ host } = drawResponse(YASGUI, { status: 500, statusText: IMG, responseText: SCRIPT }));

      expect(host.querySelector('.errorResult pre')!.textContent).toBe(SCRIPT);
      expect(injected(host)).toEqual([]);
    });

    it('patches a client once', () => {
      const { getColumns } = YASGUI.YASR.plugins.table.defaults;
      hardenYasgui(YASGUI);

      expect(YASGUI.YASR.plugins.table.defaults.getColumns).toBe(getColumns);
    });
  });

  it('ignores a client without result plugins', () => {
    expect(() => hardenYasgui({} as any)).not.toThrow();
  });
});
