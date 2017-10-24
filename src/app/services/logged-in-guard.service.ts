import {Injectable} from '@angular/core';
import {Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate} from '@angular/router';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class LoggedInGuardService implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (tokenNotExpired()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
