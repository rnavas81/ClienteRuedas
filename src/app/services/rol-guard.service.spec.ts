import { TestBed } from '@angular/core/testing';

import { RolGuardService } from './rol-guard.service';

describe('RolGuardService', () => {
  let service: RolGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
