import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {SharedVarsService} from '../../../services/shared-vars.service';
import {Box} from '../../../models/box';

@Injectable()
export class DetailsResolve implements Resolve<Box> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService,
              private router: Router, private sharedVars: SharedVarsService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Box> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get('boxes/' + route.params.id)
      .map(resp => new Box(resp.data))
      .do(
        (box: Box) => {
          this.sharedVars.setVar(route.data.breadcrumbVar, box.box_number);
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
