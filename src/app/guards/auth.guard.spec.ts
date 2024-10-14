import { TestBed } from '@angular/core/testing';
import { CanActivate } from '@angular/router';

import { AuthGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivate = (...guardParameters) => 
      TestBed.runInInjectionContext(() => AuthGuard(...guardParameters)) as boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
