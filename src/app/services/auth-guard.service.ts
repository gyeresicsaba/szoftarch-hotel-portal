import {Injectable} from '@angular/core';
import {CanActivateChild, CanLoad, CanActivate, Route, ActivatedRouteSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs/Rx';
import {User} from '../models/user';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad, CanActivateChild {

  constructor(private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>|boolean {
    return new Observable<boolean>(observer => {
      this.authService.userSubject.subscribe((user: User) => {
        const modules = user.modules;
        if (route.data['security']) {
          observer.next(modules.hasOwnProperty(route.data['security']));
        } else {
          observer.next(this.authService.isLoggedIn());
        }
        observer.complete();
      });
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.authService.isLoggedIn();
  }

  canLoad(route: Route): Observable<boolean>|boolean {
    if (!this.authService.isLoggedIn()) {
      return false;
    }
    return new Observable<boolean>(observer => {
      this.authService.userSubject.subscribe((user: User) => {
        const modules = user.modules;
        switch (route.path) {
          case '':
            observer.next(true);
            break;
          case 'admin':
            observer.next(user.IsAdmin);
            break;
          default:
            observer.next(modules.hasOwnProperty(route.data['security']));
            break;
        }
        observer.complete();
      });
    });
  }

}
