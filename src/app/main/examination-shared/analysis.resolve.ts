/**
 * Created by ekemate on 2017. 03. 13..
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {SpinnerService} from '../../services/spinner.service';
import {Observable} from 'rxjs/Rx';
import {AnalysisData} from '../../models/analysis-data';
import {AnalysisDataService} from './analysis-data.service';

@Injectable()
export class AnalysisResolve implements Resolve<AnalysisData> {
  constructor(private spinner: SpinnerService, private router: Router, private analysisDataService: AnalysisDataService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<AnalysisData> {
    this.spinner.incrementCounter('wrapper');

    return this.analysisDataService.init(route.data.analysisUrl, route.params.id)
      .do(() => {
        this.spinner.decrementCounter('wrapper');
      })
      .catch(
        (error) => {
          console.error(error);
          this.spinner.decrementCounter('wrapper');
          this.router.navigateByUrl(error.error.status_code === 404 ? 'not-found' : '');
          return Observable.of(null);
        }
      );
    /*return this.authHttp.get('pag/' + route.params.id)
     .do(
     (response) => {
     this.sharedVars.setVar<string>('pagFullIdentifier', response.data.full_identifier);
     this.spinner.decrementCounter('wrapper');
     }
     ).map(data => new AnalysisData(data.data))
     .do((data) => {
     this.sharedVars.setVar<AnalysisData>('analysisData', data);
     })
     .catch(
     (error) => {
     console.error(error);
     this.spinner.decrementCounter('wrapper');
     this.router.navigateByUrl('');
     return Observable.of(null);
     }
     );*/

  }
}
