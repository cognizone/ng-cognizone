// tslint:disable:no-any

export interface Yasgui {
  current(): CurrentYasgui;
}

export interface CurrentYasgui {
  yasqe: Yasqe;
}

export interface Yasqe {
  options: any;
  option: any;
  setValue(value: string): void;
  getValue(): string;
  on(event: string | 'change', handler: (e: any) => void): void;
  setOption(option: any): void;
}

// http://doc.yasgui.org/doc/#clientConfig
export type YasguiOptions = {
  persistencyPrefix?: (...args: any[]) => string;
  allowYasqeResize?: boolean;
  endpoint?: string;
  catalogueEndpoints?: string[] | ((instance: Yasgui, cb: Function) => void);
  api?: { corsProxy?: string; collections?: string; urlShortener?: string };
  tracker?: {
    googleAnalyticsId?: string;
    askConsent?: boolean;
  };
  yasqe?: YasqeOptions;
};

// http://yasqe.yasgui.org/doc/#config
export type YasqeOptions = {
  sparql?: {
    endpoint?: string;
  };
};

export interface YASGUI {
  (target: HTMLElement, options?: YasguiOptions): Yasgui;
  YASQE: any;
}
