import { TestBed } from '@angular/core/testing';

import { PrenomInterceptorService } from './prenom-interceptor.service';

describe('PrenomInterceptorService', () => {
  let service: PrenomInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrenomInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
