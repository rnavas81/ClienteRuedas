import { TestBed } from '@angular/core/testing';

import { RuedaService } from './rueda.service';

describe('RuedaService', () => {
  let service: RuedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RuedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
