import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { YasguiOptions } from '@cognizone/ng-yasgui';

import { ApiDescription } from '@app/shared';

@Component({
  selector: 'app-ng-yasgui-doc',
  templateUrl: './ng-yasgui-doc.component.html',
  styleUrls: ['./ng-yasgui-doc.component.scss'],
})
export class NgYasguiDocComponent implements OnInit {
  displayYasgui = false;

  form!: UntypedFormGroup;

  apis: ApiDescription[] = [
    {
      name: `
      @Input()
      options: YasguiOptions;
      `,
      description:
        'Options to be passed to YASGUI at creation. For now, it has to be set when the component is created, and it cannot be changed afterward.',
    },
    {
      name: `
      @Input()
      multiple: boolean;
      `,
      description: 'Whether or not to allow the user to have multiple tabs with multiple queries.',
    },
    {
      name: `
      @Input()
      query: string;
      `,
      description: 'The value of the query to be displayed in the yasgui component.',
    },
    {
      name: `
        @Output() 
        queryChange: EventEmitter<string>;
      `,
      description: 'When the user change the query by editing it, this event fires with the new value of the query.',
    },
  ];

  constructor(private readonly fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      options: ['{}'],
      multiple: [],
      query: [
        `
PREFIX jolux: <http://data.legilux.public.lu/resource/ontology/jolux#>
SELECT ?subject WHERE {
  ?subject jolux:userFormat <http://data.legilux.public.lu/resource/authority/user-format/pdf> .
}
`.trim(),
      ],
    });
  }

  get options(): YasguiOptions {
    try {
      return JSON.parse(this.form.value.options);
    } catch (err) {
      return {};
    }
  }

  refreshYasgui(): void {
    this.displayYasgui = false;
    setTimeout(() => (this.displayYasgui = true));
  }
}
