import { JsonLdBlankNode, JsonLdNode, JsonLdValue } from '@cognizone/json-ld/core';
import { DCT, HANAMI, RDFS, SH } from '@cognizone/lod';

export interface HanamiWorkspace extends JsonLdNode {
  [DCT.title]?: JsonLdValue[];
  [DCT.created]?: JsonLdValue[];
  [DCT.modified]?: JsonLdValue[];
}

export interface HanamiCollection extends JsonLdNode {
  [DCT.title]?: JsonLdValue[];
  [DCT.created]?: JsonLdValue[];
  [DCT.modified]?: JsonLdValue[];
  [HANAMI.shapes]?: JsonLdValue[];
  [HANAMI.workspace]?: JsonLdValue[];
  [HANAMI.baseUri]?: JsonLdValue[];
  [HANAMI.allowMultipleRoots]?: JsonLdValue[];
}

export interface ShShape extends JsonLdNode {
  [RDFS.subClassOf]?: JsonLdValue[];
  [SH.deactivated]?: JsonLdValue[];
  [SH.name]?: JsonLdValue[];
  [HANAMI.purpose]?: JsonLdValue[];
}

export interface ShNodeShape extends ShShape {
  [SH.property]?: JsonLdValue[];
  [SH.targetClass]?: JsonLdValue[];
  [SH.targetNode]?: JsonLdValue[];
  [SH.targetObjectsOf]?: JsonLdValue[];
  [SH.targetSubjectsOf]?: JsonLdValue[];
  [HANAMI.isRoot]?: JsonLdValue[];
  [HANAMI.viewer]?: JsonLdValue[];
}

export interface ShPropertyShape extends ShShape {
  [SH.class]?: JsonLdValue[];
  [SH.datatype]?: JsonLdValue[];
  [SH.or]?: JsonLdValue[];
  [SH.nodeKind]?: JsonLdValue[];
  [SH.description]?: JsonLdValue[];
  [SH.group]?: JsonLdValue[];
  [SH.maxCount]?: JsonLdValue[];
  [SH.minCount]?: JsonLdValue[];
  [SH.order]?: JsonLdValue[];
  [SH.languageIn]?: JsonLdValue[];
  [SH.uniqueLang]?: JsonLdValue[];
  [SH.path]?: JsonLdValue[];
  [SH.node]?: JsonLdValue[];
  [SH.in]?: JsonLdValue[];
  [HANAMI.editor]?: JsonLdValue[];
  [HANAMI.selection]?: JsonLdValue[];
  [HANAMI.timeZoneEncoding]?: JsonLdValue[];
  [HANAMI.listOf]?: JsonLdValue[];
  [HANAMI.readonly]?: JsonLdValue[];
}

export interface ShInversePathNode extends JsonLdBlankNode {
  [SH.inversePath]?: JsonLdValue[];
}

export interface ShPropertyGroup extends JsonLdNode {
  [RDFS.label]?: JsonLdValue[];
  [SH.order]?: JsonLdValue[];
}

export interface ShPrefixDeclaration extends JsonLdNode {
  [SH.namespace]?: JsonLdValue[];
  [SH.prefix]?: JsonLdValue[];
}

export interface HanamiPropertyOption extends JsonLdNode {
  [HANAMI.value]?: JsonLdValue[];
  [RDFS.label]?: JsonLdValue[];
}

export interface HanamiEditor extends JsonLdNode {}

export interface HanamiInputEditor extends HanamiEditor {}

export interface HanamiTextareaEditor extends HanamiEditor {}

export interface HanamiDateEditor extends HanamiEditor {}

export interface HanamiDateTimeEditor extends HanamiEditor {}

export interface HanamiCheckboxEditor extends HanamiEditor {}

export interface HanamiSelectEditor extends HanamiEditor {
  [HANAMI.option]?: JsonLdValue[];
  [SH.class]?: JsonLdValue[];
}

export interface HanamiLangStringEditor extends HanamiEditor {}

export interface HanamiNodeEditor extends HanamiEditor {
  [HANAMI.linkingStrategy]?: JsonLdValue[];
}

export interface HanamiIriEditor extends HanamiEditor {
  [SH.class]?: JsonLdValue[];
}

export interface HanamiRawEditor extends HanamiEditor {}

export type LinkingStrategy =
  | typeof HANAMI['CreateLinkingStrategy']
  | typeof HANAMI['CreateManualLinkingStrategy']
  | typeof HANAMI['ExternalReferenceLinkingStrategy']
  | typeof HANAMI['ExternalReferenceWithFormLinkingStrategy']
  | typeof HANAMI['InternalReferenceLinkingStrategy'];

export const REFERENCE_LINKING_STRATEGIES: LinkingStrategy[] = [
  HANAMI.InternalReferenceLinkingStrategy,
  HANAMI.ExternalReferenceLinkingStrategy,
  HANAMI.ExternalReferenceWithFormLinkingStrategy,
];
export const EXTERNAL_REFERENCE_LINKING_STRATEGIES: LinkingStrategy[] = [
  HANAMI.ExternalReferenceLinkingStrategy,
  HANAMI.ExternalReferenceWithFormLinkingStrategy,
];

export interface HanamiViewer extends JsonLdNode {}

export interface HanamiTemplateViewer extends HanamiViewer {
  [HANAMI.template]?: JsonLdValue[];
}

export interface RdfsClass extends JsonLdNode {
  [RDFS.subClassOf]?: JsonLdValue[];
}

export interface ShValidationReport extends JsonLdNode {
  [SH.conforms]?: JsonLdValue[];
  [SH.result]?: JsonLdValue[];
}
export interface ShValidationResult extends JsonLdNode {
  [SH.focusNode]?: JsonLdValue[];
  [SH.resultPath]?: JsonLdValue[];
  [SH.resultMessage]?: JsonLdValue[];
  [SH.resultSeverity]?: JsonLdValue[];
  [SH.sourceConstraintComponent]?: JsonLdValue[];
  [SH.sourceShape]?: JsonLdValue[];
  [SH.value]?: JsonLdValue[];
}

export type ShNodeKindConcreteValue = typeof SH.BlankNode | typeof SH.IRI | typeof SH.Literal;
export type ShNodeKindValue = ShNodeKindConcreteValue | typeof SH.BlankNodeOrIRI | typeof SH.BlankNodeOrLiteral | typeof SH.IRIOrLiteral;

export const DEFAULT_LINKING_STRATEGY: LinkingStrategy = HANAMI.CreateLinkingStrategy;

export type HanamiPurpose = typeof HANAMI.EditionPurpose | typeof HANAMI.ValidationPurpose;
export const ALL_HANAMI_PURPOSES = [HANAMI.EditionPurpose, HANAMI.ValidationPurpose] as HanamiPurpose[];
