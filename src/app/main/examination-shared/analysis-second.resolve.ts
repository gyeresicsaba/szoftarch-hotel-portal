/**
 * Created by ekemate on 2017. 03. 13..
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CustomAuthHttpService} from '../../services/custom-auth-http.service';
import {SpinnerService} from '../../services/spinner.service';

@Injectable()
export class AnalysisSecondResolve<T> implements Resolve<T> {
  private static create<T>(c: { new(elem): T }, elem: any): T {
    return new c(elem);
  }

  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<T> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get(route.data.analysisUrl + '/' + route.params.id + '/arrival2/edit')
      .do(
        () => {
          this.spinner.decrementCounter('wrapper');
        }
      ).map(data => AnalysisSecondResolve.create(route.data.type, data.data))
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
