import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Reservation} from '../../../models/reservation';
import {SharedVarsService} from '../../../services/shared-vars.service';
import {SpinnerService} from '../../../services/spinner.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';

@Injectable()
export class EditResolve implements Resolve<Reservation> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService,
              private router: Router, private sharedVars: SharedVarsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Reservation> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get('roomRes/' + route.params.id)
      .map(resp => new Reservation(resp))
      .do(
        (reservation: Reservation) => {
          this.sharedVars.setVar(route.data.breadcrumbVar, reservation.id);
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
