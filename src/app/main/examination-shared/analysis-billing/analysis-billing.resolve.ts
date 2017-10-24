import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {AnalysisBillingTable} from '../../../models/analysis-billing-table';

@Injectable()
export class AnalysisBillingResolve implements Resolve<AnalysisBillingTable> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<AnalysisBillingTable> {
    this.spinner.incrementCounter('wrapper');
    if (route.data.hasOwnProperty('analysisUrl')) {
      return Observable.forkJoin(this.authHttp.get(route.data.analysisUrl + '/' + route.params.id + '/billing'),
        this.authHttp.get(route.data.analysisUrl + '/' + route.params.id + '/billing/item-numbers'))
        .do(
          () => {
            this.spinner.decrementCounter('wrapper');
          }
        ).map(([table, items]) => {
          return {table: new AnalysisBillingTable(table.data), items: items.data};
        })
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
