import {Component, OnInit} from '@angular/core';
import {CustomAuthHttpService} from '../../services/custom-auth-http.service';
import {ToastService} from '../../services/toast.service';
import {Toast} from '../../models/toast';
import {BootstrapTypes} from '../../models/bootstrap-types';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  postError = false;
  loginError = false;

  constructor(private http: CustomAuthHttpService, private toastService: ToastService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.newPassword === this.confirmPassword) {
      this.http.post('account/password', {
        'password': this.oldPassword,
        'new_password': this.newPassword
      }).subscribe(
        () => {
          this.loginError = false;
          this.postError = false;
          this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
          this.router.navigateByUrl('');
        },
        () => {
          this.loginError = false;
          this.postError = true;
        });
    } else {
      this.loginError = true;
    }
  }
}
