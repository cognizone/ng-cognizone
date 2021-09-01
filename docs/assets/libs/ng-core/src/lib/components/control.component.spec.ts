/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, forwardRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { noop } from 'rxjs';

import { LoggerModule } from '../modules/logger/logger.module';

import { ControlComponent } from './control.component';

@Component({
  selector: 'cz-dummy-input',
  template: '<input [formControl]="embeddedControl" />',
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => DummyInputComponent), multi: true }],
})
class DummyInputComponent extends ControlComponent<unknown> {
  embeddedControl: FormControl = new FormControl();
}

@Component({
  template: ` <cz-dummy-input #input [formControl]="control"></cz-dummy-input> `,
})
class DummyReactiveSimpleFormComponent {
  @ViewChild('input', { static: true })
  input!: DummyInputComponent;

  control: FormControl = new FormControl(null, Validators.required);
}

@Component({
  template: `
    <form [formGroup]="form">
      <div formGroupName="group1">
        <div formArrayName="arr">
          <div formGroupName="0">
            <cz-dummy-input #input1 formControlName="input1"></cz-dummy-input>
          </div>
        </div>
      </div>
    </form>
  `,
})
class DummyReactiveComplexFormComponent {
  @ViewChild('input1', { static: true })
  input1!: DummyInputComponent;

  form: FormGroup = this.fb.group({
    group1: this.fb.group({
      arr: this.fb.array([this.fb.group({ input1: [] })]),
    }),
  });

  constructor(private fb: FormBuilder) {}
}

@Component({
  template: ` <cz-dummy-input #input [(ngModel)]="value"></cz-dummy-input> `,
})
class DummyTemplateFormComponent {
  @ViewChild('input', { static: true })
  input!: DummyInputComponent;

  value = '';
}

describe('ControlComponentComponent', () => {
  describe('reactive simple form', () => {
    let fixture: ComponentFixture<DummyReactiveSimpleFormComponent>;
    let component: DummyReactiveSimpleFormComponent;
    beforeEach(async(async () => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, LoggerModule.forRoot('test')],
        declarations: [DummyInputComponent, DummyReactiveSimpleFormComponent],
      });

      await TestBed.compileComponents();
      fixture = TestBed.createComponent(DummyReactiveSimpleFormComponent);
      await fixture.whenStable();
      component = fixture.componentInstance;
    }));

    test('should create the component', async(async () => {
      expect(component).toBeTruthy();
    }));

    test('should initialize', async(async () => {
      fixture.detectChanges();
      const value = 'hello';
      component.control.setValue(value);
      expect(component.control.value).toBe(value);
      expect(component.input.embeddedControl.value).toBe(value);
    }));

    test('should be required', async(async () => {
      fixture.detectChanges();
      expect(component.input.required).toBe(true);
    }));

    test('should adapt to control change', async(async () => {
      const getOnModelChange = (c: ControlComponent<any>) => (c as any).onModelChange;

      const value = 'hello';
      component.control.setValue(value);
      fixture.detectChanges();

      const originalOnChange = getOnModelChange(component.input);
      expect(originalOnChange).toBeTruthy();

      const newValue = 'something else';
      const newControl = new FormControl();
      newControl.setValue(newValue);
      const oldControl = component.control;
      component.control = newControl;
      fixture.detectChanges();

      expect(oldControl.value).toBe(value);
      expect(newControl.value).toBe(newValue);
      expect(component.input.embeddedControl.value).toBe(newValue);
      const newOnModelChange = getOnModelChange(component.input);
      expect(newOnModelChange).not.toEqual(noop);
      expect(newOnModelChange).not.toEqual(originalOnChange);
    }));
  });

  describe('reactive complex form', () => {
    let fixture: ComponentFixture<DummyReactiveComplexFormComponent>;
    let component: DummyReactiveComplexFormComponent;
    beforeEach(async(async () => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, LoggerModule.forRoot('test')],
        declarations: [DummyInputComponent, DummyReactiveComplexFormComponent],
      });

      await TestBed.compileComponents();
      fixture = TestBed.createComponent(DummyReactiveComplexFormComponent);
      await fixture.whenStable();
      component = fixture.componentInstance;
    }));

    test('should create the component', async(async () => {
      expect(component).toBeTruthy();
    }));

    test('should have a correct name', async(async () => {
      fixture.detectChanges();
      expect(component.input1.name).toBe('group1-arr-0-input1');
    }));

    test('should not be required', async(async () => {
      fixture.detectChanges();
      expect(component.input1.required).toBe(undefined);
    }));
  });

  describe('template form', () => {
    let fixture: ComponentFixture<DummyTemplateFormComponent>;
    let component: DummyTemplateFormComponent;
    beforeEach(async(async () => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, FormsModule, LoggerModule.forRoot('test')],
        declarations: [DummyInputComponent, DummyTemplateFormComponent],
      });

      await TestBed.compileComponents();
      fixture = TestBed.createComponent(DummyTemplateFormComponent);
      await fixture.whenStable();
      component = fixture.componentInstance;
    }));

    test('should create the component', async(async () => {
      expect(component).toBeTruthy();
    }));

    test('should initialize', async(async () => {
      fixture.detectChanges();
      const value = 'hello';
      component.value = value;
      fixture.detectChanges();
      expect(component.value).toBe(value);
      await wait(0); // we have to wait because double binding doesn't seem to be synchronous
      expect(component.input.embeddedControl.value).toBe(value);
    }));

    test('should adapt to control change', async(async () => {
      const getOnModelChange = (c: ControlComponent<any>) => (c as any).onModelChange;

      const value = 'hello';
      component.value = value;
      fixture.detectChanges();

      const originalOnChange = getOnModelChange(component.input);
      expect(originalOnChange).toBeTruthy();

      const newValue = 'something else';
      component.value = newValue;
      fixture.detectChanges();

      expect(component.value).toBe(newValue);
      await wait(0); // we have to wait because double binding doesn't seem to be synchronous
      expect(component.input.embeddedControl.value).toBe(newValue);
      const newOnModelChange = getOnModelChange(component.input);
      expect(newOnModelChange).not.toEqual(noop);
      expect(newOnModelChange).toEqual(originalOnChange);
    }));
  });
});

async function wait(time: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}
