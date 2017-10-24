/**
 * Created by ekemate on 2017. 03. 13..
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {AnalysisFirst} from '../../../models/analysis-first';

@Injectable()
export class AnalysisFirstResolve implements Resolve<AnalysisFirst> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<AnalysisFirst> {
    this.spinner.incrementCounter('wrapper');

    if (route.data.hasOwnProperty('analysisUrl')) {
      return this.authHttp.get(route.data.analysisUrl + '/' + route.params.id + '/arrival1/edit')
        .do(
          () => {
            this.spinner.decrementCounter('wrapper');
          }
        ).map(data => new AnalysisFirst(data.data))
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
}
