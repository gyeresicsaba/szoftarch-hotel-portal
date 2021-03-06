import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../../services/custom-auth-http.service';
import {Room} from '../../../../models/room';
import {SpinnerService} from '../../../../services/spinner.service';
import {SharedVarsService} from '../../../../services/shared-vars.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EditResolve implements Resolve<Room> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService,
              private router: Router, private sharedVars: SharedVarsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Room> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get('room/' + route.params.id)
      .map(resp => new Room(resp))
      .do(
        (hotel: Room) => {
          this.sharedVars.setVar(route.data.breadcrumbVar, hotel.id);
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
