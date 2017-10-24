/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';
import {LoggedInGuardService} from './logged-in-guard.service';
import {Router, RouterStateSnapshot, ActivatedRouteSnapshot} from '@angular/router';
import * as angular2Jwt from 'angular2-jwt';
import {MockRouter} from '../../mock/router.mock';

describe('LoggedInGuardService', () => {
  let mockRouter: MockRouter;
  const next: ActivatedRouteSnapshot = new ActivatedRouteSnapshot;
  const state: RouterStateSnapshot = <RouterStateSnapshot>{};

  beforeEach(() => {
    mockRouter = new MockRouter();

    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useValue: mockRouter},
        LoggedInGuardService,
      ]
    });
  });

  it('should activate page', inject([LoggedInGuardService], (service: LoggedInGuardService) => {
    spyOn(angular2Jwt, 'tokenNotExpired').and.callFake(() => {
      return false;
    });

    const result = service.canActivate(next, state);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(0);
    expect(result).toBeTruthy();
  }));

  it('should navigate to login', inject([LoggedInGuardService], (service: LoggedInGuardService) => {
    spyOn(angular2Jwt, 'tokenNotExpired').and.callFake(() => {
      return true;
    });

    const result = service.canActivate(next, state);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    expect(result).toBeFalsy();
  }));
});
