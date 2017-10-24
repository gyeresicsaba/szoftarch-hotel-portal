import {Injectable} from '@angular/core';
import {AuthHttp as JwtAuthHttp} from 'angular2-jwt';
import {RequestOptionsArgs, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ModalService} from './modal.service';
import {Modal} from '../models/modal';
import {ErrorModal} from '../models/error-modal';

@Injectable()
export class CustomAuthHttpService {
  private static extractData(res: Response) {
    let body = {};
    if (res.text()) {
      body = res.json();
    }
    return body || {};
  }

  private static isUnauthorized(status: number): boolean {
    return /*!status || status === 0 || */status === 401;
  }

  constructor(private authHttp: JwtAuthHttp, private router: Router, private modalService: ModalService) {
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    if (!(error.json() instanceof ProgressEvent) && CustomAuthHttpService.isUnauthorized(error.status)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this.router.navigateByUrl('/login');
      return Observable.of();
    } else if (error.status === 422) {
      this.modalService.openError(new ErrorModal('Hiba', error.json(), []));
      console.error(errMsg);
      return Observable.throw(CustomAuthHttpService.extractData(error));
    } else if (error.status === 404) {
      console.error(errMsg);
      return Observable.throw(CustomAuthHttpService.extractData(error));
    } else {
      this.modalService.open(new Modal('Hiba', error.text(), []));
      console.error(errMsg);
      return Observable.throw(CustomAuthHttpService.extractData(error));
    }
  }

  private authIntercept(response: Observable<Response>): Observable<any> {
    return response
      .map(CustomAuthHttpService.extractData)
      .catch((error) => this.handleError(error));
  }

  /**
   * @param url  Url of the request
   * @param options Http options
   * @returns      Observable for the request
   */
  public get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.get(environment.apiPrefix + url, options));
  }

  public post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.post(environment.apiPrefix + url, body, options));
  }

  public put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.put(environment.apiPrefix + url, body, options));
  }

  //noinspection ReservedWordAsName
  public delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return this.authIntercept(this.authHttp.delete(environment.apiPrefix + url, options));
  }
}
