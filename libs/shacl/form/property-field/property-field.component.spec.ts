import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyFieldComponent } from './property-field.component';

describe('PropertyFieldComponent', () => {
  let component: PropertyFieldComponent;
  let fixture: ComponentFixture<PropertyFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyFieldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
