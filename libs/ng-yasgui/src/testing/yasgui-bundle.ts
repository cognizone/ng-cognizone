/* eslint-disable @typescript-eslint/no-explicit-any */
import { readFileSync } from 'fs';
import { join } from 'path';

import { Binding } from '../lib/utils/harden-yasgui';

const bundle = readFileSync(join(__dirname, '../assets/yasgui.min.js'), 'utf8');

export const IMG = '<img src=x onerror=alert(1) data-xss>';
export const SCRIPT = '</sup></span></a><script data-xss>alert(1)</script>';
export const SINGLE_QUOTE = `' onmouseover='alert(1)' data-xss='`;
export const DOUBLE_QUOTE = `" onmouseover="alert(1)" data-xss="`;
/** The tag stripping of DataTables (`<.*?>`) stops at a line separator */
export const LINE_SEPARATOR = '&><img src=x onerror=alert(1) data-xss \u2028';
export const PAYLOADS = [IMG, SCRIPT, SINGLE_QUOTE, DOUBLE_QUOTE, LINE_SEPARATOR];

export type TestRow = Record<string, Binding>;

/** Evaluates the real prebuilt bundle, each call gives a client with unpatched plugin defaults */
export function loadYasguiBundle(): any {
  // indirect eval: global scope, so that the bundle registers itself on window
  // eslint-disable-next-line no-eval
  (0, eval)(bundle);
  return (window as any).YASGUI;
}

export function createHost(): HTMLElement {
  const host = document.createElement('div');
  host.id = `host-${Math.random().toString(36).slice(2)}`;
  document.body.appendChild(host);
  return host;
}

export const sparqlJson = (bindings: TestRow[], vars: string[] = Object.keys(bindings[0] ?? {})): object => ({
  head: { vars },
  results: { bindings },
});

/** Shows `response` in a result view on a new host */
export function drawResponse(yasgui: any, response: unknown, options: Record<string, unknown> = {}): { host: HTMLElement; yasr: any } {
  const host = createHost();
  const yasr = yasgui.YASR(host, { useGoogleCharts: false, persistency: { prefix: false, results: {} }, ...options });
  yasr.setResponse(response);
  return { host, yasr };
}

/** Elements that can only come from a payload: marked ones, scripts and inline event handlers */
export function injected(root: ParentNode): Element[] {
  return Array.from(root.querySelectorAll('*')).filter(
    el => el.matches('[data-xss], script') || el.getAttributeNames().some(name => name.startsWith('on'))
  );
}

/** Records every innerHTML assignment, also on detached nodes, until `stop` */
export function watchInnerHtml(): { injected(): string[]; stop(): void } {
  const innerHTML = Object.getOwnPropertyDescriptor(Element.prototype, 'innerHTML') as PropertyDescriptor;
  const assigned: string[] = [];
  Object.defineProperty(Element.prototype, 'innerHTML', {
    ...innerHTML,
    set(value: unknown): void {
      assigned.push(String(value));
      innerHTML.set?.call(this, value);
    },
  });
  return {
    /** Payload elements in what was assigned, parsed in an inert document */
    injected: () =>
      assigned.flatMap(html => {
        const template = document.implementation.createHTMLDocument('').createElement('template');
        innerHTML.set?.call(template, html);
        return injected(template.content).map(el => el.outerHTML);
      }),
    stop: () => Object.defineProperty(Element.prototype, 'innerHTML', innerHTML),
  };
}

/** The least of the Google charts api that the chart view of the bundle calls */
export function stubGoogleCharts(): void {
  class DataTable {
    private readonly types: string[] = [];
    addColumn = (type: string): number => this.types.push(type);
    getColumnType = (column: number): string => this.types[column];
    addRow = (): void => undefined;
  }
  class ChartWrapper {
    setOption = (): void => undefined;
    setDataTable = (): void => undefined;
    draw = (): void => undefined;
  }
  (window as any).google = {
    load: (_name: string, _version: string, { callback }: { callback(): void }) => callback(),
    visualization: { DataTable, ChartWrapper, ChartEditor: class {}, events: { addListener: () => undefined } },
  };
}

/** Queries are not sent: collects them, `respond` answers the last one */
export function stubAjax(yasgui: any): { respond(body: unknown): void; queries: any[] } {
  const queries: any[] = [];
  yasgui.$.ajax = (config: any) => {
    if (config.complete) queries.push(config);
    return { abort: () => undefined };
  };
  return {
    queries,
    respond: body => {
      const xhr = { status: 200, responseText: JSON.stringify(body), getResponseHeader: () => 'application/sparql-results+json' };
      queries[queries.length - 1].complete.forEach((callback: (...args: unknown[]) => void) => callback(xhr, 'success'));
    },
  };
}
