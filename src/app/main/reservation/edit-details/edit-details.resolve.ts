import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class EditDetailsResolve implements Resolve<Array<Hotel>> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(): Observable<Array<Hotel>> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get('hotel')
      .do(
        () => {
          this.spinner.decrementCounter('wrapper');
        }
      ).map((item) => item.map(x => new Hotel(x)))
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
