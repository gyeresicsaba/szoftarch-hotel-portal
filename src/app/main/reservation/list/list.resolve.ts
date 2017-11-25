import {Observable} from 'rxjs/Observable';
import {Reservation} from '../../../models/reservation';
import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';

@Injectable()
export class ListResolve implements Resolve<Array<Reservation>> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router) {
  }

  resolve(): Observable<Array<Reservation>> {
    this.spinner.incrementCounter('wrapper');

    return this.authHttp.get('roomres')
      .do(
        () => {
          this.spinner.decrementCounter('wrapper');
        }
      ).map((item) => {
        const temp = item.map(x => new Reservation(x));
        console.log(temp);
        return item.map(x => new Reservation(x));
      })
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
