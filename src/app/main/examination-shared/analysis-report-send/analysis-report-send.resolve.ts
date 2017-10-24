/**
 * Created by ekemate on 2017. 03. 21..
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {ReportSendElem} from '../../../models/report-send-elem';

@Injectable()
export class AnalysisReportSendResolve implements Resolve<ReportSendElem[]> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<ReportSendElem[]> {
    this.spinner.incrementCounter('wrapper');

    if (route.data.hasOwnProperty('analysisUrl')) {
      return this.authHttp.get(route.data.analysisUrl + '/' + route.params.id + '/report/send')
        .do(
          () => {
            this.spinner.decrementCounter('wrapper');
          }
        ).map(resp => resp.data.map(elem => new ReportSendElem(elem)))
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
