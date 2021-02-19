import { TestBed } from '@angular/core/testing';

import { VerRuedaService } from './ver-rueda.service';

describe('VerRuedaService', () => {
  let service: VerRuedaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerRuedaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
