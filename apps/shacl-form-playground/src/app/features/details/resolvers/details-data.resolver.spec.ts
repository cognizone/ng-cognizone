import { TestBed } from '@angular/core/testing';

import { DetailsDataResolver } from './details-data.resolver';

describe('DetailsDataResolver', () => {
  let resolver: DetailsDataResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(DetailsDataResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
