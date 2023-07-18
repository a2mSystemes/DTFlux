import { TestBed } from '@angular/core/testing';

import { SelectedRunnerService } from './selected-runner.service';

describe('SelectedRunnerService', () => {
  let service: SelectedRunnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectedRunnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
