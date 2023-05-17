import { TestBed } from '@angular/core/testing';

import { RequestEtatService } from './request-etat.service';

describe('RequestEtatService', () => {
  let service: RequestEtatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestEtatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
