import {Observable} from 'rxjs/Observable';
import {Hotel} from '../../../models/hotel';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {SharedVarsService} from '../../../services/shared-vars.service';
import {Http} from '@angular/http';
import {environment} from '../../../../environments/environment';

@Injectable()
export class EditResolve implements Resolve<Hotel> {
  constructor(private authHttp: CustomAuthHttpService, private http: Http, private spinner: SpinnerService,
              private router: Router, private sharedVars: SharedVarsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Hotel> {
    this.spinner.incrementCounter('wrapper');

    return this.http.get(environment.apiPrefix + 'hotel/' + route.params.id)
      .map(resp => new Hotel(resp.json()))
      .do(
        (hotel: Hotel) => {
          this.sharedVars.setVar(route.data.breadcrumbVar, hotel.name);
          this.spinner.decrementCounter('wrapper');
        }
      ).catch(
        (error) => {
          console.error(error);
          this.spinner.decrementCounter('wrapper');
          this.router.navigateByUrl(error.error.status_code === 404 ? 'not-found' : '');
          return Observable.of(null);
        }
      );
  }
}
