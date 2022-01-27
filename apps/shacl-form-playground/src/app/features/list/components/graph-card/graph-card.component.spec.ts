import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphCardComponent } from './graph-card.component';

describe('GraphCardComponent', () => {
  let component: GraphCardComponent;
  let fixture: ComponentFixture<GraphCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
