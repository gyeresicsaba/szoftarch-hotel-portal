import {Component, Input, OnInit} from '@angular/core';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ToastService} from '../../../services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {Toast} from '../../../models/toast';
import {BootstrapTypes} from '../../../models/bootstrap-types';
import {Http} from '@angular/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  @Input() hotelInput: string;
  hotel;
  starArray: Array<any> = [{name: '1', value: 1}, {name: '2', value: 2}, {name: '3', value: 3}, {
    name: '4',
    value: 4
  }, {name: '5', value: 5}];
  isNew = true;

  constructor(private authHttp: CustomAuthHttpService, private toastService: ToastService, private router: Router,
              private route: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    if (this.hotelInput) {
      this.hotel = this.hotelInput;
      this.isNew = false;
    } else {
      this.hotel = new Hotel({});
    }
  }

  onSubmit() {
    if (this.isNew) {
      console.log(this.hotel.Saveable);
      this.http.post(environment.apiPrefix + 'hotel', this.hotel.Saveable).subscribe(() => {
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
        this.router.navigateByUrl('/hotel/list');
      });
    } else {
      this.http.put(environment.apiPrefix + 'hotel/' + this.hotel.id, this.hotel).subscribe(() => {
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
        // this.router.navigateByUrl('/hotel/list');
      });
    }
  }

}
