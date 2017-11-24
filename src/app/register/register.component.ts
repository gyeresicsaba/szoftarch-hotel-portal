import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  credentials = {username: '', password: ''};
  loginError: boolean;

  constructor(private http: Http, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.http.post(environment.apiPrefix + 'account/register', this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('');
      },
      () => {
        this.loginError = true;
      }
    );
  }
}
