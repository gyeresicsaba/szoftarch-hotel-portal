import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {PaginatedResponse} from '../../../models/paginated-response';
import {Box} from '../../../models/box';

@Injectable()
export class ListResolve implements Resolve<PaginatedResponse<Box>> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(): Observable<PaginatedResponse<Box>> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get('boxes')
      .do(
        () => {
          this.spinner.decrementCounter('wrapper');
        }
      ).map(list => new PaginatedResponse<Box>(list, Box))
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
