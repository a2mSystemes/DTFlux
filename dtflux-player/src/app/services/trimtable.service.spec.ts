import { TestBed } from '@angular/core/testing';

import { TrimtableService } from './trimtable.service';

describe('TrimtableService', () => {
  let service: TrimtableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrimtableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
