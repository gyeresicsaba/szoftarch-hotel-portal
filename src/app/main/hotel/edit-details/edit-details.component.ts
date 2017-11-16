import {Component, Input, OnInit} from '@angular/core';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ToastService} from '../../../services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {Toast} from '../../../models/toast';
import {BootstrapTypes} from '../../../models/bootstrap-types';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  @Input() hotelInput: string;
  hotel;
  isNew = true;

  constructor(private authHttp: CustomAuthHttpService, private toastService: ToastService, private router: Router,
              private route: ActivatedRoute) {
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
    console.log(this.hotel);
    // if (this.isNew) {
    //   this.authHttp.post('users', this.user).subscribe((response: {status: string, id: number}) => {
    //     this.authHttp.post('users/' + response.id + '/roles', {role_ids: this.role_ids}).subscribe(() => {
    //       this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
    //       this.router.navigateByUrl('/admin/users/list');
    //     });
    //   });
    // } else {
    //   const userHttp = this.authHttp.put('users/' + this.user.id, this.user);
    //   const rolesHttp = this.authHttp.post('users/' + this.user.id + '/roles', {role_ids: this.role_ids});
    //
    //   Observable.forkJoin(userHttp, rolesHttp).subscribe(() => {
    //     this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
    //   });
    // }
  }

}
