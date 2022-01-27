import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShaclTemplateComponent } from './shacl-template.component';

describe('ShaclTemplateComponent', () => {
  let component: ShaclTemplateComponent;
  let fixture: ComponentFixture<ShaclTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShaclTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShaclTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
