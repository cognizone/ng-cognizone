import { TestBed } from '@angular/core/testing';

import { ShaclOptionsService } from './shacl-options.service';

describe('ShaclOptionsService', () => {
  let service: ShaclOptionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShaclOptionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
