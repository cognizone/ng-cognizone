import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cz-elastic-instance-editor',
  templateUrl: './elastic-instance-editor.component.html',
  styleUrls: ['./elastic-instance-editor.component.scss'],
})
export class ElasticInstanceEditorComponent implements OnInit {
  form: UntypedFormGroup = this.fb.group({
    url: new UntypedFormControl('', [Validators.pattern('^https?://(.*)'), Validators.required]),
    label: new UntypedFormControl(''),
  });

  constructor(private fb: UntypedFormBuilder, @Inject(MAT_DIALOG_DATA) public data: ElasticInstanceEditorComponentData) {}

  ngOnInit(): void {
    if (this.data) this.form.patchValue({ url: this.data.url, label: this.data.label });
  }
}

interface ElasticInstanceEditorComponentData {
  operation: string;
  url?: string;
  label?: string;
}
