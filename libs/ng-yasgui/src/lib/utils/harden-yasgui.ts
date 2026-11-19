import { YASGUI } from '../models/yasgui';

/** One value of a SPARQL json result row */
export interface Binding {
  type?: string;
  value?: string;
  datatype?: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'xml:lang'?: string;
}

export type Row = Record<string, Binding | undefined>;

interface TableColumn {
  title: string;
  visible?: boolean;
}

interface Yasr {
  options: { uriTarget: string };
  results: { getVariables(): string[] };
}

interface TablePlugin {
  options: { mergeLabelsWithUris?: boolean | string };
}

interface TableDefaults {
  getCellContent(
    yasr: Yasr,
    plugin: TablePlugin,
    row: Row,
    name: string,
    context: { usedPrefixes?: Record<string, string> | null }
  ): string;
  getColumns(yasr: Yasr, plugin: TablePlugin): TableColumn[];
}

interface LeafletDefaults {
  formatPopup(yasr: unknown, leaflet: unknown, name: string, row: Row): HTMLElement | undefined;
  missingPopupMsg(yasr: unknown, leaflet: unknown, geoVariables?: string[]): HTMLElement | undefined;
}

interface ChartYasr {
  warn(message: unknown): void;
}

type ChartPlugin = new (yasr: ChartYasr) => object;

interface Plugins {
  table?: { defaults: TableDefaults };
  leaflet?: { defaults: LeafletDefaults };
  gchart?: ChartPlugin;
}

/** The parts of the bundled client that are patched */
interface HardenedYasgui {
  YASR?: { plugins?: Plugins };
  czHardened?: boolean;
}

const XSD = 'http://www.w3.org/2001/XMLSchema#';

/** Other schemes (javascript:, data:...) are shown as text */
const LINKABLE_SCHEMES = /^(https?:\/\/|mailto:)/i;

/** Line breaks too: the tag stripping of DataTables (`<.*?>`) stops at them */
const escapeHtml = (text: string): string => text.replace(/[<>"'&\r\n\u2028\u2029]/g, char => `&#${char.charCodeAt(0)};`);

/** Unlike outerHTML, also escapes `<` and `>` in attribute values, and quotes in text */
function toHtml(node: Node): string {
  if (!(node instanceof Element)) return escapeHtml(node.textContent ?? '');
  const attributes = node.getAttributeNames().map(name => ` ${name}="${escapeHtml(node.getAttribute(name) ?? '')}"`);
  return `<${node.localName}${attributes.join('')}>${Array.from(node.childNodes, toHtml).join('')}</${node.localName}>`;
}

function element(tag: string, text: string = '', attributes: Record<string, string> = {}): HTMLElement {
  const el = document.createElement(tag);
  el.textContent = text;
  Object.entries(attributes).forEach(([name, value]) => el.setAttribute(name, value));
  return el;
}

const valueOf = (binding: Binding): string => String(binding.value ?? '');

function linkOrSpan(binding: Binding, target: string): HTMLElement {
  const uri = valueOf(binding);
  return binding.type === 'uri' && LINKABLE_SCHEMES.test(uri) ? element('a', '', { href: uri, target, rel: 'noopener' }) : element('span');
}

function shorten(uri: string, prefixes?: Record<string, string> | null): string {
  const used = Object.entries(prefixes ?? {}).find(([, namespace]) => uri.startsWith(namespace));
  return used ? `${used[0]}:${uri.slice(used[1].length)}` : uri;
}

/** `value`, `"value"@en` or `"value"^^xsd:date`, as the bundle shows literals */
function appendLiteral(parent: HTMLElement, binding: Binding): void {
  const lang = binding['xml:lang'];
  const datatype = binding.datatype && String(binding.datatype);
  if (lang) {
    parent.append(`"${valueOf(binding)}"`, element('sup', `@${lang}`));
  } else if (datatype) {
    const shortType = datatype.startsWith(XSD) ? `xsd:${datatype.slice(XSD.length)}` : `<${datatype}>`;
    parent.append(`"${valueOf(binding)}"`, element('sup', `^^${shortType}`));
  } else {
    parent.append(valueOf(binding));
  }
}

function hardenTable(table: TableDefaults): void {
  table.getCellContent = (yasr, plugin, row, name, context) => {
    const binding = row[name] ?? {};
    const isUri = binding.type === 'uri';
    const content = linkOrSpan(binding, String(yasr.options.uriTarget));
    content.className = content.matches('a') ? 'uri' : 'nonUri';

    const merge = plugin.options.mergeLabelsWithUris;
    const label = isUri && merge ? row[name + (typeof merge === 'string' ? merge : 'Label')] : undefined;
    if (label) {
      content.title = valueOf(binding);
      appendLiteral(content, label);
    } else if (isUri) {
      content.textContent = shorten(valueOf(binding), context.usedPrefixes);
    } else {
      appendLiteral(content, binding);
    }

    const cell = document.createElement('div');
    cell.append(content);
    return toHtml(cell);
  };

  const getColumns = table.getColumns;
  table.getColumns = (yasr, plugin) => {
    const variables = yasr.results.getVariables();
    // first column is the row number
    return getColumns(yasr, plugin).map((column, i) =>
      i === 0 ? column : { ...column, title: toHtml(element('span', variables[i - 1])) }
    );
  };
}

function hardenLeaflet(leaflet: LeafletDefaults): void {
  leaflet.formatPopup = (_yasr, _leaflet, name, row) => {
    const label = row[`${name}Label`];
    if (!label?.value) return undefined;
    const popup = linkOrSpan(label, '_blank');
    popup.textContent = valueOf(label);
    return popup;
  };

  leaflet.missingPopupMsg = (_yasr, _leaflet, geoVariables) => {
    if (!geoVariables?.length) return undefined;
    const tip = element('small');
    tip.append(
      'Tip: Add a label variable prefixed with the geo variable name to show popups on the map. E.g. ',
      element('code', `${geoVariables[0]}Label`),
      '. Or, append ',
      element('code', 'Color'),
      ' to change the color of the shape or marker.'
    );
    return tip;
  };
}

/** The bundle's message has the variable name as HTML: '... for variable <i>NAME</i>. Assuming ...' */
function chartWarning(message: string): string {
  const [, before, variable, after] = /^(.*?)<i>(.*)<\/i>(.*)$/s.exec(message) ?? [];
  return variable === undefined ? escapeHtml(message) : `${escapeHtml(before)}<i>${escapeHtml(variable)}</i>${escapeHtml(after)}`;
}

/** Proxy: the statics of the plugin (`defaults`) stay those of the bundle */
function hardenChart(plugin: ChartPlugin): ChartPlugin {
  return new Proxy(plugin, {
    construct: (target, [yasr]: [ChartYasr]) => {
      const warn = (message: unknown): void => yasr.warn(typeof message === 'string' ? chartWarning(message) : message);
      return new target(Object.create(yasr, { warn: { value: warn } }));
    },
  });
}

/**
 * The prebuilt bundle (assets/yasgui.min.js, yasgui-yasr 2.12.19) concatenates query results into HTML.
 * Replaces those renderers by ones that escape them. Plugins copy their `defaults` when instantiated,
 * so this has to run before the client is created.
 */
export function hardenYasgui(yasgui: YASGUI): void {
  const client = yasgui as HardenedYasgui;
  const plugins = client.YASR?.plugins;
  if (!plugins || client.czHardened) return;

  if (plugins.table) hardenTable(plugins.table.defaults);
  if (plugins.leaflet) hardenLeaflet(plugins.leaflet.defaults);
  if (plugins.gchart) plugins.gchart = hardenChart(plugins.gchart);
  client.czHardened = true;
}
