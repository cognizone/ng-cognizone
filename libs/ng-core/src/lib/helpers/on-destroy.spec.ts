import { Component, inject, OnInit, Type } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';

import { OnDestroy$ } from './on-destroy';

const classSpy = jest.fn();
const compositionSpy = jest.fn();

@Component({
  template: '',
  standalone: false,
})
class TestChildComponent extends OnDestroy$ {
  constructor() {
    super();
    this.onDestroy$.subscribe(classSpy);
  }
}

@Component({
  template: '',
  providers: [OnDestroy$],
  standalone: false,
})
class TestCompositionComponent extends OnDestroy$ implements OnInit {
  private onDestroy = inject(OnDestroy$);

  ngOnInit(): void {
    this.onDestroy.onDestroy$.subscribe(compositionSpy);
  }
}

async function setupTest(clazz: Type<unknown>): Promise<ComponentFixture<unknown>> {
  await TestBed.configureTestingModule({
    declarations: [clazz],
  }).compileComponents();
  const fixture = TestBed.createComponent(clazz);
  await fixture.whenStable();
  return fixture;
}

describe('Helper: OnDestroy$', () => {
  test('should destroy - class based', fakeAsync(async () => {
    const fixture = await setupTest(TestChildComponent);
    expect(classSpy).not.toHaveBeenCalled();

    fixture.destroy();

    expect(classSpy).toHaveBeenCalled();
  }));

  test('should destroy - composition based', fakeAsync(async () => {
    const fixture = (await setupTest(TestCompositionComponent)) as ComponentFixture<TestCompositionComponent>;
    fixture.componentInstance.ngOnInit();
    expect(compositionSpy).not.toHaveBeenCalled();

    fixture.destroy();

    expect(compositionSpy).toHaveBeenCalled();
  }));
});
