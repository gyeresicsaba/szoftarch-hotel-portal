import {Injectable} from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {SpinnerService} from '../../../services/spinner.service';
import {Hotel} from '../../../models/hotel';
import {Http, Response} from '@angular/http';
import {environment} from '../../../../environments/environment';


@Injectable()
export class ListResolve implements Resolve<Array<Hotel>> {
  constructor(private authHttp: CustomAuthHttpService, private spinner: SpinnerService, private router: Router,
              private http: Http) {
  }

  resolve(): Observable<Array<Hotel>> {
    this.spinner.incrementCounter('wrapper');

    return this.http.get(environment.apiPrefix + 'hotel')
      .do(
        () => {
          this.spinner.decrementCounter('wrapper');
        }
      ).map((item: Response) => {
      console.log(item);
        const temp = item.json().map(x => new Hotel(x));
        console.log(temp);
        return item.json().map(x => new Hotel(x));
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
