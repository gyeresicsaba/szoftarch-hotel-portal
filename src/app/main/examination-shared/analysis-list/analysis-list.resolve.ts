import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {PaginatedResponse} from '../../../models/paginated-response';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {AnalysisListItem} from '../../../models/analysis-list-item';
import {ListSettings} from '../../../models/list-settings';

@Injectable()
export class AnalysisListResolve implements Resolve<PaginatedResponse<AnalysisListItem>> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<PaginatedResponse<AnalysisListItem>> {
    this.spinner.incrementCounter('wrapper');
    if (route.data.hasOwnProperty('analysisUrl')) {
      let url = route.data.analysisUrl;
      let first = true;
      const storage = new ListSettings(route.data.analysisUrl);
      storage.removeOthers();
      if (Object.keys(route.params).length) {
        storage.remove();
        for (const obj in route.params) {
          if (route.params.hasOwnProperty(obj)) {
            url += (first ? '?' : '&') + obj + '=' + route.params[obj];
            first = false;

            if (storage.hasOwnProperty(obj)) {
              storage[obj] = route.params[obj];
            }
          }
        }
        storage.save();
      } else {
        let localUrl = '/' + route.data.analysisUrl + '/list;';
        for (const obj in storage) {
          if (storage.hasOwnProperty(obj) && !!storage[obj] && obj !== 'analysisUrl') {
            first = false;
            localUrl += ';' + obj + '=' + storage[obj];
          }
        }
        if (!first) {
          this.router.navigateByUrl(localUrl);
        }
      }

      return this.authHttp.get(url)
        .do(
          () => {
            this.spinner.decrementCounter('wrapper');
          }
        ).map(list => new PaginatedResponse<AnalysisListItem>(list, AnalysisListItem))
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
