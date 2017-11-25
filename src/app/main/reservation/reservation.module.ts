import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {EditDetailsComponent} from './edit-details/edit-details.component';
import {ListResolve} from './list/list.resolve';
import {ReservationRoutingModule} from './reservation-routing/reservation-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditResolve} from './edit/edit.resolve';

@NgModule({
  imports: [
    CommonModule,
    ReservationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    EditDetailsComponent
  ],
  providers: [
    EditResolve,
    ListResolve
  ]
})
export class ReservationModule {
}
