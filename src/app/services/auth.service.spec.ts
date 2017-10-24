import {TestBed, inject} from '@angular/core/testing';
import {AuthService} from './auth.service';
import * as angular2Jwt from 'angular2-jwt';
import {JwtHelper} from 'angular2-jwt';
import {Http, HttpModule} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CustomAuthHttpService} from './custom-auth-http.service';
import {AuthModule} from '../auth/auth.module';
import {MockRouter} from '../../mock/router.mock';

describe('AuthService', () => {
  let mockRouter: MockRouter;
  let httpStub;
  let mockAuthHttp;
  let jwtHelperStub;
  let tokenSpy: jasmine.Spy;

  beforeEach(() => {
    mockRouter = new MockRouter();
    httpStub = {
      post: jasmine.createSpy('post'),
      get: jasmine.createSpy('get'),
      request: jasmine.createSpy('request')
    };
    mockAuthHttp = {
      get: jasmine.createSpy('auth get'),
    };
    jwtHelperStub = {
      decodeToken: jasmine.createSpy('decodeToken').and.returnValue({sub: 1})
    };

    tokenSpy = spyOn(angular2Jwt, 'tokenNotExpired').and.callFake(() => {
      return false;
    });

    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        AuthModule
      ],
      providers: [
        AuthService,
        CustomAuthHttpService,
        {
          provide: JwtHelper,
          useValue: jwtHelperStub
        },
        {
          provide: Http,
          useValue: httpStub
        },
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        },
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should redirect if not logged in', inject([AuthService], (service: AuthService) => {
    tokenSpy.and.callFake(() => {
      return false;
    });

    service.isLoggedIn();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  it('should log out user on error', inject([AuthService], (service: AuthService) => {
    tokenSpy.and.callFake(() => {
      throw new Error('test error');
    });
    spyOn(localStorage, 'removeItem');

    service.isLoggedIn();

    expect(localStorage.removeItem).toHaveBeenCalledTimes(2);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/login');
  }));

  it('should return true', inject([AuthService], (service: AuthService) => {
    tokenSpy.and.callFake(() => {
      return true;
    });
    spyOn(localStorage, 'removeItem');

    expect(service.isLoggedIn()).toBe(true);

    expect(localStorage.removeItem).toHaveBeenCalledTimes(0);
    expect(mockRouter.navigateByUrl).toHaveBeenCalledTimes(0);
  }));

  it('should login', inject([AuthService], (service: AuthService) => {
    const mockResponse = {
      json() {
        return {
          token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImlzcyI6Imh' +
          '0dHA6XC9cL2FwaS5hdGtmdC5kZXYubWlrLmJtZS5odVwvYXBpXC9sb2dpbiIsImlhdCI6MTQ4NzU5NjI5OSwiZXhwIjoxNDg3OTU2Mjk5LCJ' +
          'uYmYiOjE0ODc1OTYyOTksImp0aSI6IjBhNTZmNjdjMDBiZTI5MGExZTQ4ZmU4OWQ' +
          '0NDU3ZGI5In0.Q9Hc0hbuympJIV5c6G6EWTVk0U90P8QICRN5d5AHlfE'
        };
      }
    };

    httpStub.post.and.callFake(() => {
      return Observable.of(mockResponse);
    });

    mockAuthHttp.get.and.returnValue(Observable.of({
      'data': {
        'id': 1,
        'name': 'Admin J\u00e1nos',
        'email': 'admin@atkft.hu'
      }
    }));

    service.logIn({email: 'email@example.hu', password: 'password'}).subscribe();

    service.userSubject.subscribe((user) => {
      expect(user.id).toBe(1);
    });
    expect(httpStub.post).toHaveBeenCalledTimes(1);
  }));

  it('should log error', inject([AuthService], (service: AuthService) => {
    httpStub.post.and.callFake(() => {
      return new Observable((observer) => {
        observer.error('test error');
      });
    });

    spyOn(console, 'error');

    try {
      service.logIn({email: 'email@example.hu', password: 'password'}).subscribe();
    } catch (err) {
      expect(console.error).toHaveBeenCalledTimes(1);
    }

    expect(httpStub.post).toHaveBeenCalledTimes(1);
  }));
});
