import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../../shared/shared.module';
import {ListComponent} from './list/list.component';
import {AddComponent} from './add/add.component';
import {DetailsComponent} from './details/details.component';
import {EditComponent} from './edit/edit.component';
import {EditDetailsComponent} from './edit-details/edit-details.component';
import {HotelRoutingModule} from './hotel-routing/hotel-routing.module';
import {ListResolve} from './list/list.resolve';
import {DetailsResolve} from './details/details.resolve';
import {EditResolve} from './edit/edit.resolve';

@NgModule({
  imports: [
    CommonModule,
    HotelRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule
  ],
  declarations: [
    AddComponent,
    DetailsComponent,
    EditComponent,
    EditDetailsComponent,
    ListComponent
  ],
  providers: [
    DetailsResolve,
    EditResolve,
    ListResolve
  ]
})
export class HotelModule {
}
