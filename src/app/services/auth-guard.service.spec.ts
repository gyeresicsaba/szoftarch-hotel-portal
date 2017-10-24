import {TestBed, inject} from '@angular/core/testing';
import {AuthGuardService} from './auth-guard.service';
import {AuthService} from './auth.service';
import {Http} from '@angular/http';
import {RouterTestingModule} from '@angular/router/testing';
import {Router, ActivatedRouteSnapshot} from '@angular/router';
import {AppModule} from '../app.module';
import {AsyncSubject, Observable} from 'rxjs/Rx';
import {User} from '../models/user';
import {TestData} from '../../mock/test-data';

describe('AuthGuardService', () => {
  let httpStub;
  let authServiceStub;

  beforeEach(() => {
    httpStub = {};
    authServiceStub = {
      isLoggedIn: jasmine.createSpy('isLoggedIn'),
      userSubject: new AsyncSubject<User>()
    };
    authServiceStub.userSubject.next(new User(TestData.userResponse.data));
    authServiceStub.userSubject.complete();
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: Http,
          useValue: httpStub
        },
        {
          provide: Router,
          useValue: RouterTestingModule
        }
      ]
    });
  });

  it('should call loggedIn', inject([AuthGuardService], (service: AuthGuardService) => {
    authServiceStub.isLoggedIn.and.returnValue(true);
    service.canActivate(new ActivatedRouteSnapshot);
    service.canActivateChild(new ActivatedRouteSnapshot);
    service.canLoad({});

    expect(authServiceStub.isLoggedIn).toHaveBeenCalledTimes(2);
  }));

  it('should return false if not logged in', inject([AuthGuardService], (service: AuthGuardService) => {
    authServiceStub.isLoggedIn.and.returnValue(false);
    const canActivate = service.canActivate(<ActivatedRouteSnapshot>{data: {}});
    if (canActivate instanceof Observable) {
      canActivate.subscribe(result => {
        expect(result).toBe(false);
      });
    }

    expect(service.canActivateChild(new ActivatedRouteSnapshot)).toBe(false);
    expect(service.canLoad({})).toBe(false);
  }));

  it('should check security', inject([AuthGuardService], (service: AuthGuardService) => {
    const activatedRoute = new ActivatedRouteSnapshot();
    activatedRoute.data = {security: 'partner'};

    let canActivate = service.canActivate(activatedRoute);
    if (canActivate instanceof Observable) {
      canActivate.subscribe(result => {
        expect(result).toBe(true);
      });
    }

    activatedRoute.data = {security: 'random'};
    canActivate = service.canActivate(activatedRoute);
    if (canActivate instanceof Observable) {
      canActivate.subscribe(result => {
        expect(result).toBe(false);
      });
    }
  }));

  it('should check canLoad', inject([AuthGuardService], (service: AuthGuardService) => {
    authServiceStub.isLoggedIn.and.returnValue(true);
    const route = {data: {security: 'partner'}, path: ''};

    let canLoad = service.canLoad(route);
    if (canLoad instanceof Observable) {
      canLoad.subscribe(result => {
        expect(result).toBe(true);
      });
    }

    route.path = 'admin';
    canLoad = service.canLoad(route);
    if (canLoad instanceof Observable) {
      canLoad.subscribe(result => {
        expect(result).toBe(true);
      });
    }

    route.path = 'random';
    route.data.security = 'partner';
    canLoad = service.canLoad(route);
    if (canLoad instanceof Observable) {
      canLoad.subscribe(result => {
        expect(result).toBe(true);
      });
    }

    route.path = 'random';
    route.data.security = 'random';
    canLoad = service.canLoad(route);
    if (canLoad instanceof Observable) {
      canLoad.subscribe(result => {
        expect(result).toBe(false);
      });
    }
  }));
});
