/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { IMG, loadYasguiBundle, stubAjax } from '../../../testing/yasgui-bundle';
import { YasguiService } from '../../services/yasgui.service';
import { YasguiComponent } from './yasgui.component';

describe('YasguiComponent', () => {
  it('restricts the share link before the client reads it', async () => {
    const YASGUI = loadYasguiBundle();
    stubAjax(YASGUI);
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: YasguiService, useValue: { loadYasgui: () => of(YASGUI), unloadYasgui: () => undefined } }],
    });
    const settings = encodeURIComponent(JSON.stringify({ datatable: { language: { info: IMG } } }));
    window.location.hash = `query=ASK%20%7B%7D&outputFormat=table&outputSettings=${settings}`;

    const fixture = TestBed.createComponent(YasguiComponent);
    fixture.componentRef.setInput('options', { yasqe: { sparql: { endpoint: 'http://localhost/sparql' } } });
    fixture.detectChanges();
    // ngOnInit is async and not awaited by angular
    await new Promise(resolve => setTimeout(resolve));

    const tab = (fixture.componentInstance as any).yasgui.current();
    expect(tab.yasqe.getValue()).toBe('ASK {}');
    expect(tab.yasr.plugins.table.options.datatable.language).toBeUndefined();
    fixture.destroy();
  });
});
