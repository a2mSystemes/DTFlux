import { TestBed } from '@angular/core/testing';

import { FinnisherServiceService } from './finnisher-service.service';

describe('FinnisherServiceService', () => {
  let service: FinnisherServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinnisherServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
