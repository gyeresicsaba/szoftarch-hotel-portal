import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {LoginComponent} from '../login/login.component';
import {LoggedInGuardService} from '../services/logged-in-guard.service';
import {AuthGuardService} from '../services/auth-guard.service';
import {NotFoundComponent} from '../shared/not-found/not-found.component';
import {RegisterComponent} from '../register/register.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
        {
          path: 'login',
          canActivate: [LoggedInGuardService],
          component: LoginComponent
        },
        {
          path: 'register',
          component: RegisterComponent
        },
        {
          path: '',
          canLoad: [AuthGuardService],
          canActivate: [AuthGuardService],
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
