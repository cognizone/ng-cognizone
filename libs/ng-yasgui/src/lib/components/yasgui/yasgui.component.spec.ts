/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
import { TestBed } from '@angular/core/testing';

import { IMG, loadYasguiBundle, stubAjax } from '../../../testing/yasgui-bundle';
import { YasguiComponent } from './yasgui.component';

describe('YasguiComponent', () => {
  afterEach(() => history.replaceState(null, '', '/'));

  it('restricts the share link before the client reads it', async () => {
    localStorage.clear();
    const settings = encodeURIComponent(JSON.stringify({ datatable: { language: { info: IMG } } }));
    window.location.hash = `query=ASK%20%7B%7D&outputFormat=table&outputSettings=${settings}&endpoint=http%3A%2F%2Fevil.example.org`;

    const fixture = TestBed.createComponent(YasguiComponent);
    fixture.componentRef.setInput('options', { yasqe: { sparql: { endpoint: 'http://localhost/sparql' } } });
    fixture.detectChanges();
    // jsdom does not load scripts
    const YASGUI = loadYasguiBundle();
    const ajax = stubAjax(YASGUI);
    document.querySelector('script[src="assets/ng-yasgui/yasgui.min.js"]')!.dispatchEvent(new Event('load'));
    // ngOnInit is async and not awaited by angular
    await new Promise(resolve => setTimeout(resolve));

    const tab = (fixture.componentInstance as any).yasgui.current();
    expect(tab.yasqe.getValue()).toBe('ASK {}');
    expect(tab.yasr.plugins.table.options.datatable.language).toBeUndefined();
    expect(ajax.queries[0].url).toBe('http://localhost/sparql');
    fixture.destroy();
  });
});
