import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {BoxRoutingModule} from './box-routing/box-routing.module';
import {ListResolve} from './list/list.resolve';
import {DetailsComponent} from './details/details.component';
import {DetailsResolve} from './details/details.resolve';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {EditDetailsComponent} from './edit-details/edit-details.component';
import {EditResolve} from './edit/edit.resolve';
import {SummarizedListComponent} from './summarized-list/summarized-list.component';
import {SummarizedListResolve} from './summarized-list/summarized-list.resolve';

//noinspection JSUnusedGlobalSymbols
@NgModule({
  imports: [
    CommonModule,
    BoxRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ListComponent,
    DetailsComponent,
    AddComponent,
    EditComponent,
    EditDetailsComponent,
    SummarizedListComponent,
  ],
  providers: [
    DetailsResolve,
    EditResolve,
    ListResolve,
    SummarizedListResolve
  ]
})
export class MainBoxModule { }
