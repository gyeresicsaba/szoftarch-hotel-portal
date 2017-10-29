import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {LoggedInGuardService} from '../services/logged-in-guard.service';
import {AuthGuardService} from '../services/auth-guard.service';
import {PasswordReminderComponent} from '../password-reminder/password-reminder.component';
import {PasswordResetComponent} from '../password-reset/password-reset.component';
import {NotFoundComponent} from '../shared/not-found/not-found.component';
import {PrintComponent} from '../print/print.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
        {
          path: 'login',
          // canActivate: [LoggedInGuardService],
          component: LoginComponent
        },
        {
          path: 'password',
          component: PasswordReminderComponent
        },
        {
          path: 'password/reset',
          component: PasswordResetComponent
        },
        {
          path: 'print/:url',
          component: PrintComponent
        },
        {
          path: '',
          // canLoad: [AuthGuardService],
          // canActivate: [AuthGuardService],
          loadChildren: '../main/main.module#MainModule',
        },
        {
          path: '**',
          component: NotFoundComponent
        }
      ],
      {useHash: true}
    )
  ],
  declarations: [],
  exports: [
    RouterModule
  ]
})
export class AppRouterModule {
}
