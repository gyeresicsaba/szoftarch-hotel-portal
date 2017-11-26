import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListComponent} from '../list/list.component';
import {ListResolve} from '../list/list.resolve';
import {EditResolve} from '../edit/edit.resolve';
import {EditComponent} from '../edit/edit.component';
import {AddComponent} from '../add/add.component';
import {EditDetailsResolve} from '../edit-details/edit-details.resolve';
import {DetailsComponent} from '../details/details.component';
import {DetailsResolve} from '../details/details.resolve';

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
      {
        path: 'add',
        component: AddComponent,
        data: {
          breadcrumb: 'Új'
        },
        resolve: {hotels: EditDetailsResolve}
      },
      {
        path: ':id',
        component: DetailsComponent,
        data: {
          breadcrumbVar: 'currentReservationId'
        },
        resolve: {response: DetailsResolve}
      },
      {
        path: ':id/edit',
        component: EditComponent,
        data: {
          breadcrumbVar: 'currentReservationId'
        },
        resolve: {response: EditResolve, hotels: EditDetailsResolve}
      },
    ])
  ],
  declarations: []
})
export class ReservationRoutingModule {
}
