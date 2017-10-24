import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  credentials = {token: '', email: '', password: '', password_confirm: ''};
  token: string;
  loginError: boolean;
  loginSuccess: boolean;

  constructor(private route: ActivatedRoute, private http: Http) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: Params) => {
      this.credentials.token = params['token'];
    });
  }

  onSubmit() {
    this.http.post(environment.apiPrefix + 'password/reset', this.credentials)
      .subscribe(
        () => {
          this.loginError = false;
          this.loginSuccess = true;
        },
        () => {
          this.loginError = true;
          this.loginSuccess = false;
        }
      );
  }

}
