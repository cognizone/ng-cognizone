/** Options that make Google charts render cell or tooltip text as HTML, and the key jQuery's extend would use as prototype */
const DROPPED_KEYS = ['allowHtml', 'isHtml', '__proto__'];

const SETTINGS_PARAM = 'outputSettings=';

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
    ...(typeof chartType === 'string' && { chartType }),
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

/** For example 'query=SELECT...&outputSettings=%7B"datatable":1%7D' -> 'query=SELECT...' */
export function restrictShareLinkParams(params: string): string {
  return params
    .split('&')
    .map(param => (param.startsWith(SETTINGS_PARAM) ? restrictSettingsParam(param) : param))
    .filter(param => param !== null)
    .join('&');
}

function restrictUrl(url: URL): boolean {
  const hash = restrictShareLinkParams(url.hash.slice(1));
  const search = restrictShareLinkParams(url.search.slice(1));
  if (hash === url.hash.slice(1) && search === url.search.slice(1)) return false;

  // prefixed: the setters strip one leading # or ? of what is left
  url.hash = hash && `#${hash}`;
  url.search = search && `?${search}`;
  return true;
}

/**
 * The client reads the share link from the hash, or else the query string, when it is created.
 * `YasguiComponent` calls this: code that creates the client itself from `YasguiService.loadYasgui()` has to call it first.
 */
export function restrictShareLinkInUrl(): void {
  const url = new URL(window.location.href);
  let changed = false;
  // until nothing is dropped any more, so that what is left reads the same when restricted again
  while (restrictUrl(url)) changed = true;
  if (changed) history.replaceState(history.state, '', url.toString());
}
