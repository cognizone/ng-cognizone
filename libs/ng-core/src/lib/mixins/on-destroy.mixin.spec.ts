import { Component, OnDestroy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnDestroyMixin } from './on-destroy.mixin';

const parentSpy = jest.fn();
const spy = jest.fn();

class Parent implements OnDestroy {
  ngOnDestroy(): void {
    parentSpy();
  }
}

@Component({ template: '' })
class TestComponent extends OnDestroyMixin(Parent) {
  constructor() {
    super();
    this.onDestroy$.subscribe(spy);
  }
}

describe('Mixin: OnDestroyMixin', () => {
  let fixture: ComponentFixture<TestComponent>;
  beforeEach(async(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    await fixture.whenStable();
  }));

  test('should destroy', () => {
    expect(spy).not.toHaveBeenCalled();
    expect(parentSpy).not.toHaveBeenCalled();

    fixture.destroy();

    expect(spy).toHaveBeenCalled();
    expect(parentSpy).toHaveBeenCalled();
  });
});
