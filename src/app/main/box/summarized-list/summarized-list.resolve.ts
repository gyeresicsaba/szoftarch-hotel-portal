import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {PaginatedResponse} from '../../../models/paginated-response';
import {BoxBase} from '../../../models/box-base';

@Injectable()
export class SummarizedListResolve implements Resolve<PaginatedResponse<BoxBase>> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(): Observable<PaginatedResponse<BoxBase>> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get('boxes/summary')
      .do(
        () => {
          this.spinner.decrementCounter('wrapper');
        }
      ).map(list => new PaginatedResponse<BoxBase>(list, BoxBase))
      .catch(
        (error) => {
          console.error(error);
          this.spinner.decrementCounter('wrapper');
          this.router.navigateByUrl('');
          return Observable.of(null);
        }
      );

  }
}
