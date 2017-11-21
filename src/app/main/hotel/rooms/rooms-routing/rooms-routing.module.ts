import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {RoomsComponent} from '../rooms.component';
import {AddComponent} from '../add/add.component';
import {DetailsComponent} from '../details/details.component';
import {EditComponent} from '../edit/edit.component';
import {EditResolve} from '../edit/edit.resolve';
import {DetailsResolve} from '../details/details.resolve';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RoomsComponent,
        data: {
          breadcrumb: 'Termek',
          breadcrumbVar: '',
        },
        children: [
          {
            path: '',
            redirectTo: 'add',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddComponent,
            data: {
              breadcrumb: 'Új'
            }
          },
          {
            path: ':id',
            component: DetailsComponent,
            data: {
              breadcrumbVar: 'currentRoomName'
            },
            resolve: {response: DetailsResolve}
          },
          {
            path: ':id/edit',
            component: EditComponent,
            data: {
              breadcrumbVar: 'currentRoomName'
            },
            resolve: {response: EditResolve}
          }
        ]
      }
    ])
  ],
  declarations: []
})
export class RoomsRoutingModule {
}
