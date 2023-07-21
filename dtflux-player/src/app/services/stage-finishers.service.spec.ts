import { TestBed } from '@angular/core/testing';

import { StageFinishersService } from './stage-finishers.service';

describe('StageFinishersService', () => {
  let service: StageFinishersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StageFinishersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
