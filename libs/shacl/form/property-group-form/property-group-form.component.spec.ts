import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyGroupFormComponent } from './property-group-form.component';

describe('PropertyGroupFormComponent', () => {
  let component: PropertyGroupFormComponent;
  let fixture: ComponentFixture<PropertyGroupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyGroupFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
