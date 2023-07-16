import { TestBed } from '@angular/core/testing';

import { SpotterService } from './spotter.service';

describe('SpotterService', () => {
  let service: SpotterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
