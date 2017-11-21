import {NgModule} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {RouterModule} from '@angular/router';
import {AddComponent} from '../add/add.component';
import {EditComponent} from '../edit/edit.component';
import {ListResolve} from '../list/list.resolve';
import {DetailsComponent} from '../details/details.component';
import {DetailsResolve} from '../details/details.resolve';
import {EditResolve} from '../edit/edit.resolve';

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
      },
      {
        path: ':id',
        component: DetailsComponent,
        data: {
          breadcrumbVar: 'currentHotelName'
        },
        resolve: {response: DetailsResolve}
      },
      {
        path: ':id/edit',
        component: EditComponent,
        data: {
          breadcrumbVar: 'currentHotelName'
        },
        resolve: {response: EditResolve}
      },
      {
        path: ':id/rooms',
        // canLoad: [AuthGuardService],
        // canActivate: [AuthGuardService],
        loadChildren: 'app/main/hotel/rooms/rooms.module#HotelRoomsModule',
        data: {
          breadcrumbVar: 'currentHotelName',
          // security: 'service'
        },
      }
    ])
  ],
  declarations: []
})
export class HotelRoutingModule {
}
