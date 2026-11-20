/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { firstValueFrom } from 'rxjs';

import { createHost, drawResponse, IMG, injected, loadYasguiBundle, sparqlJson, stubAjax } from '../../testing/yasgui-bundle';
import { YasguiService } from './yasgui.service';

/** The client of `service` once its script has loaded */
async function load(service: YasguiService): Promise<any> {
  const loaded = firstValueFrom(service.loadYasgui());
  // jsdom does not load scripts
  loadYasguiBundle();
  document.querySelector('script[src="assets/ng-yasgui/yasgui.min.js"]')!.dispatchEvent(new Event('load'));
  return loaded;
}

describe('YasguiService', () => {
  let service: YasguiService;

  beforeEach(() => (service = new YasguiService()));

  afterEach(() => {
    service.unloadYasgui();
    history.replaceState(null, '', '/');
  });

  it('gives a hardened client once the script has loaded', async () => {
    const YASGUI = await load(service);

    const { host } = drawResponse(YASGUI, sparqlJson([{ l: { type: 'literal', value: 'x', 'xml:lang': IMG } }]));

    expect(host.querySelector('table.resultsTable sup')!.textContent).toBe(`@${IMG}`);
    expect(injected(host)).toEqual([]);
  });

  describe('share link', () => {
    const settings = encodeURIComponent(JSON.stringify({ datatable: { language: { info: IMG } } }));
    const link = `query=ASK%20%7B%7D&outputFormat=table&outputSettings=${settings}&endpoint=http%3A%2F%2Fevil.example.org%2Fsparql`;

    /** Creates the client on the link, gives its tab and request */
    function create(YASGUI: any): { tab: any; request: any } {
      localStorage.clear();
      window.location.hash = link;
      const ajax = stubAjax(YASGUI);
      const tab = YASGUI(createHost(), { yasqe: { sparql: { endpoint: 'http://localhost/sparql' } } }).current();
      return { tab, request: ajax.queries[0] };
    }

    it('is restricted each time the client is created', async () => {
      const YASGUI = await load(service);

      for (let i = 0; i < 2; i++) {
        const { tab, request } = create(YASGUI);
        expect(tab.yasqe.getValue()).toBe('ASK {}');
        expect(tab.yasr.plugins.table.options.datatable.language).toBeUndefined();
        expect(request.url).toBe('http://localhost/sparql');
      }
    });

    it('keeps its request settings when the app sets keepShareLinkRequestSettings, even after loading', async () => {
      const YASGUI = await load(service);
      service.keepShareLinkRequestSettings = true;

      const { tab, request } = create(YASGUI);

      expect(request.url).toBe('http://evil.example.org/sparql');
      expect(tab.yasr.plugins.table.options.datatable.language).toBeUndefined();
    });

    it('gives the statics of the client', async () => {
      const YASGUI = await load(service);

      expect(YASGUI.YASQE.defaults.sparql).toBeDefined();
      expect(YASGUI.YASR.plugins.table).toBeDefined();
    });
  });
});
