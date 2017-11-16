import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {MainComponent} from '../main.component';
import {AuthGuardService} from '../../services/auth-guard.service';
import {NotFoundComponent} from '../../shared/not-found/not-found.component';
import {ProfileComponent} from '../profile/profile.component';
import {RcaComponent} from '../rca/rca.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MainComponent,
        children: [
          {
            path: '',
            component: HomeComponent,
            data: {
              breadcrumb: 'Főoldal'
            },
          },
          {
            path: 'rca',
            component: RcaComponent
          },
          {
            path: 'profile',
            // canLoad: [AuthGuardService],
            // canActivate: [AuthGuardService],
            component: ProfileComponent
          },
          {
            path: 'hotel',
            // canLoad: [AuthGuardService],
            // canActivate: [AuthGuardService],
            loadChildren: '../hotel/hotel.module#HotelModule',
            data: {
              breadcrumb: 'Hotelek',
              security: 'hotel'
            },
          },
          {
            path: 'not-found',
            component: NotFoundComponent,
            data: {
              breadcrumb: 'Nem található'
            },
          },
        ]
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {
}
