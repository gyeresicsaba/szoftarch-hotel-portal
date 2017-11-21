import {Injectable} from '@angular/core';
import {AsyncSubject, Observable} from 'rxjs/Rx';
import {User} from '../models/user';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Http, Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {CustomAuthHttpService} from './custom-auth-http.service';

@Injectable()
export class AuthService {
  userId: number;
  user: User;
  userSubject = new AsyncSubject<User>();

  constructor(private jwtHelper: JwtHelper, private http: Http, private router: Router, private authHttp: CustomAuthHttpService) {
    try {
      if (tokenNotExpired()) {
        this.userId = this.jwtHelper.decodeToken(localStorage.getItem('token')).sub;
        this.getUser();
      }
    } catch (err) {
      console.error(err);
    }
  }

  private getUser() {
    this.authHttp.get('account/userinfo').map((data) => {
      return new User(data);
    }).subscribe(user => {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = user;
      this.userSubject.next(user);
      this.userSubject.complete();
    });
  }

  private setToken(token: string) {
    this.userId = this.jwtHelper.decodeToken(token).sub;
    localStorage.setItem('token', token);
    return token;
  }

  public get Token() {
    return localStorage.getItem('token');
  }

  logIn(credentials: {username: string, password: string}): Observable<Response> {
    return this.http.post(environment.apiPrefix + 'account/login', credentials).do(
      (resp) => {
        console.log(resp.json());
        this.setToken(resp.json());
        this.getUser();
      },
      (err) => console.error(err),
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.user = null;
    this.userSubject = new AsyncSubject<User>();
    this.router.navigateByUrl('/login');
  }

  isLoggedIn() {
    try {
      if (!tokenNotExpired()) {
        this.logOut();
        return false;
      }
    } catch (err) {
      console.error(err.message);
      this.logOut();
      return false;
    }

    return true;
  }
}
