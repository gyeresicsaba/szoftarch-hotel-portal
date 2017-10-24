import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {ListComponent} from '../list/list.component';
import {ListResolve} from '../list/list.resolve';
import {DetailsComponent} from '../details/details.component';
import {DetailsResolve} from '../details/details.resolve';
import {EditComponent} from '../edit/edit.component';
import {AddComponent} from '../add/add.component';
import {EditResolve} from '../edit/edit.resolve';
import {SummarizedListComponent} from '../summarized-list/summarized-list.component';
import {SummarizedListResolve} from '../summarized-list/summarized-list.resolve';

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
        path: 'summary',
        component: SummarizedListComponent,
        data: {
          breadcrumb: 'Összesített Lista'
        },
        resolve: {response: SummarizedListResolve}
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
          breadcrumbVar: 'currentBoxNumber'
        },
        resolve: {response: DetailsResolve}
      },
      {
        path: ':id/edit',
        component: EditComponent,
        data: {
          breadcrumbVar: 'currentBoxNumber'
        },
        resolve: {response: EditResolve}
      },
    ])
  ],
  declarations: []
})
export class BoxRoutingModule { }
