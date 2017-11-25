import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListComponent} from '../list/list.component';
import {ListResolve} from '../list/list.resolve';
import {EditResolve} from '../edit/edit.resolve';
import {EditComponent} from '../edit/edit.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent,
        data: {
          breadcrumb: 'Lista'
        },
        resolve: {response: ListResolve}
      },
      // {
      //   path: 'add',
      //   component: AddComponent,
      //   data: {
      //     breadcrumb: 'Új'
      //   },
      // },
      // {
      //   path: ':id',
      //   component: DetailsComponent,
      //   data: {
      //     breadcrumbVar: 'currentHotelName'
      //   },
      //   resolve: {response: DetailsResolve}
      // },
      {
        path: ':id/edit',
        component: EditComponent,
        data: {
          breadcrumbVar: 'currentHotelName'
        },
        resolve: {response: EditResolve}
      },
    ])
  ],
  declarations: []
})
export class ReservationRoutingModule {
}
