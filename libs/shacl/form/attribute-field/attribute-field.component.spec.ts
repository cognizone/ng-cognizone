import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeFieldComponent } from './attribute-field.component';

describe('AttributeFieldComponent', () => {
  let component: AttributeFieldComponent;
  let fixture: ComponentFixture<AttributeFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttributeFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributeFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
