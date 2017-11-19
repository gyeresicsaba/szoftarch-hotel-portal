import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {SharedVarsService} from '../../../services/shared-vars.service';
import {Http} from '@angular/http';
import {Hotel} from '../../../models/hotel';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Injectable()
export class DetailsResolve implements Resolve<Hotel> {
  constructor(private authHttp: CustomAuthHttpService, private http: Http, private spinner: SpinnerService,
              private router: Router, private sharedVars: SharedVarsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Hotel> {
    this.spinner.incrementCounter('wrapper');

    return this.http.get(environment.apiPrefix + 'hotel/' + route.params.id)
      .map(data => new Hotel(data.json()))
      .do((hotel: Hotel) => {
          this.sharedVars.setVar(route.data.breadcrumbVar, hotel.name);
          this.spinner.decrementCounter('wrapper');
        }
      )
      .catch(
        (error) => {
          console.error(error);
          this.spinner.decrementCounter('wrapper');
          this.router.navigateByUrl(error.error.status_code === 404 ? 'not-found' : '');
          return Observable.of(null);
        }
      );
  }
}
