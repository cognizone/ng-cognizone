/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { firstValueFrom } from 'rxjs';

import { drawResponse, IMG, injected, loadYasguiBundle, sparqlJson } from '../../testing/yasgui-bundle';
import { YasguiService } from './yasgui.service';

describe('YasguiService', () => {
  it('gives a hardened client once the script has loaded', async () => {
    const service = new YasguiService();
    const loaded = firstValueFrom(service.loadYasgui());
    // jsdom does not load scripts
    loadYasguiBundle();
    document.querySelector('script[src="assets/ng-yasgui/yasgui.min.js"]')!.dispatchEvent(new Event('load'));
    const YASGUI: any = await loaded;

    const { host } = drawResponse(YASGUI, sparqlJson([{ l: { type: 'literal', value: 'x', 'xml:lang': IMG } }]));

    expect(host.querySelector('table.resultsTable sup')!.textContent).toBe(`@${IMG}`);
    expect(injected(host)).toEqual([]);
    service.unloadYasgui();
  });
});
