import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cz-elastic-instance-editor',
  templateUrl: './elastic-instance-editor.component.html',
  styleUrls: ['./elastic-instance-editor.component.css'],
})
export class ElasticInstanceEditorComponent implements OnInit {
  form: FormGroup = this.fb.group({
    url: new FormControl('', [Validators.pattern('^https?://(.*)'), Validators.required]),
    label: new FormControl(''),
  });

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: ElasticInstanceEditorComponentData) {}

  ngOnInit(): void {
    if (this.data) this.form.patchValue({ url: this.data.url, label: this.data.label });
  }
}

interface ElasticInstanceEditorComponentData {
  operation: string;
  url?: string;
  label?: string;
}
