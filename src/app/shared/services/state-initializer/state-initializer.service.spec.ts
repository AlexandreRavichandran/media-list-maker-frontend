import { TestBed } from '@angular/core/testing';

import { StateInitializerService } from './state-initializer.service';

describe('StateInitializerService', () => {
  let service: StateInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StateInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
