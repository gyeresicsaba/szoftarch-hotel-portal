import {NgModule} from '@angular/core';
import {ListComponent} from '../list/list.component';
import {RouterModule} from '@angular/router';
import {AddComponent} from '../add/add.component';
import {EditComponent} from '../edit/edit.component';
import {ListResolve} from '../list/list.resolve';

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
      // {
      //   path: ':id',
      //   component: DetailsComponent,
      //   data: {
      //     breadcrumbVar: 'currentBoxNumber'
      //   },
      //   resolve: {response: DetailsResolve}
      // },
      {
        path: ':id/edit',
        component: EditComponent,
        data: {
          breadcrumbVar: 'currentBoxNumber'
        },
        // resolve: {response: EditResolve}
      },
    ])
  ],
  declarations: []
})
export class HotelRoutingModule {
}
