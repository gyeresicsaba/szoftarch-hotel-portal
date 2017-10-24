import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credentials = {email: '', password: ''};
  loginError: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.logIn(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl('');
      },
      () => {
        this.loginError = true;
      }
    );
  }
}
