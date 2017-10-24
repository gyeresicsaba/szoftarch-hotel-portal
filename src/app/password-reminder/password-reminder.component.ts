import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-password-reminder',
  templateUrl: './password-reminder.component.html',
  styleUrls: ['./password-reminder.component.scss']
})
export class PasswordReminderComponent implements OnInit {

  loginError: boolean;
  loginSuccess: boolean;
  emailAddress: string;

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post(environment.apiPrefix + 'password/url', {email: this.emailAddress})
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
