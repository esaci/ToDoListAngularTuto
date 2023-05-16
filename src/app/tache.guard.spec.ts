import { TestBed } from '@angular/core/testing';

import { TacheGuard } from './tache.guard';

describe('TacheGuard', () => {
  let guard: TacheGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TacheGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
