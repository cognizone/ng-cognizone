import { ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { I18nService } from '@cognizone/i18n';
import { isOfType, JsonModel, PrefixCcService } from '@cognizone/json-model';
import { UrisStoreService } from '@cognizone/json-model-graph';
import { manyToArray, notNil, SelectOption, selectOptionMatchQuery, SelectOptionsProvider } from '@cognizone/model-utils';
import { OnDestroy$ } from '@cognizone/ng-core';
import { LinkingStrategy, ShaclHelper, ShaclHelperDefinition, ShPropertyShape } from '@cognizone/shacl/core';
import { HandlebarService } from '@cognizone/shacl/template';
import { of } from 'rxjs';

@Component({
  selector: 'cz-add-reference-button',
  templateUrl: './add-reference-button.component.html',
  styleUrls: ['./add-reference-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReferenceButtonComponent extends OnDestroy$ implements OnInit {
  @Input()
  property!: ShPropertyShape;
  @Input()
  value?: any;
  @Input()
  isSingle?: boolean;
  @Input()
  propertyKey!: string;

  @ViewChild('allowReferenceDialog')
  allowReferenceDialogTplRef!: TemplateRef<unknown>;

  linkingStrategies: LinkingStrategy[] = ['allow_create'];

  referencesProvider!: SelectOptionsProvider<string>;
  referenceControl: FormControl = this.fb.control(null, Validators.required);

  icons: { [key: string]: string } = {
    allow_create: 'add_circle_outline',
    allow_reference: 'link',
  };

  constructor(
    private urisStoreService: UrisStoreService,
    private prefixCcService: PrefixCcService,
    private dialog: MatDialog,
    private shaclHelper: ShaclHelper,
    private handlebarService: HandlebarService,
    private fb: FormBuilder,
    private i18nService: I18nService
  ) {
    super();
  }

  ngOnInit(): void {
    this.linkingStrategies = this.property['shacz:linkingStrategy'] ?? this.linkingStrategies;
    this.initReferencesProvider();
  }

  addReference(linkingStrategy: LinkingStrategy): void {
    if (linkingStrategy === 'allow_reference') {
      this.subSink = this.dialog
        .open(this.allowReferenceDialogTplRef)
        .afterClosed()
        .subscribe(value => {
          if (value) {
            this.addReferenceValue(value);
          }
        });
    } else {
      this.addReferenceValue(undefined);
    }
  }

  private addReferenceValue(value: string | undefined): void {
    const wrapper = this.urisStoreService.getWrapper();
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;
    const type = this.prefixCcService.convertUri(
      this.property['sh:class'] as string,
      definition.shapesGraph['@context'] ?? {},
      definition.modelContext
    );

    let updatedNodes: JsonModel[];
    if (this.isSingle) {
      updatedNodes = wrapper.setReference(wrapper.getNodeSnapshot(this.urisStoreService.nodeUri), this.propertyKey as any, value, type);
    } else {
      updatedNodes = wrapper.addReference(wrapper.getNodeSnapshot(this.urisStoreService.nodeUri), this.propertyKey as any, value, type);
    }
    wrapper.update(...updatedNodes);
    const newUri = updatedNodes[1]['@id'];
    if (!value) {
      setTimeout(() => {
        document.getElementById(newUri)?.scrollIntoView({ behavior: 'smooth' });
      });
    }
  }

  private initReferencesProvider() {
    const types = manyToArray(this.property['sh:class']).filter(notNil);
    const wrapper = this.urisStoreService.getWrapper();

    this.referencesProvider = {
      hasOptionFor: () => of(true),
      getValueOption: value => of(value as any), // TODO
      getOptions: (query, params) => {
        const currentValues = manyToArray(this.value);
        query = query?.toLowerCase();
        const models = Object.values(wrapper.getGraphSnapshot().models).filter(
          model => !currentValues.includes(model['@id']) && types.some(type => isOfType(model, type))
        );

        let options: SelectOption[] = models.map(model => {
          const template = this.getShortTemplate(model);
          const label = template ? this.handlebarService.compileTemplate(template)({ item: model }) : model['@id'];
          return {
            value: model['@id'],
            label: { [this.i18nService.getActiveSimpleLang()]: label },
          };
        });
        if (query) {
          options = options.filter(option => option.value.includes(query as string) || selectOptionMatchQuery(option, query));
        }

        return of(options);
      },
    };
  }

  private getShortTemplate(model: JsonModel): string | undefined {
    const wrapper = this.urisStoreService.getWrapper();
    const type = model['@type'];
    const definition = wrapper.getDefinition() as ShaclHelperDefinition;
    const nodeShape = this.shaclHelper.getNodeShape(definition, type);
    return nodeShape['shacz:shortTemplate'];
  }
}
