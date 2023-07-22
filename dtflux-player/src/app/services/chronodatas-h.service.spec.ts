import { TestBed } from '@angular/core/testing';

import { ChronodatasHService } from './chronodatas-h.service';

describe('ChronodatasHService', () => {
  let service: ChronodatasHService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChronodatasHService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
