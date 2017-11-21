import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoomsComponent} from './rooms.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RoomsRoutingModule} from './rooms-routing/rooms-routing.module';
import {AddComponent} from './add/add.component';
import {EditComponent} from './edit/edit.component';
import {EditDetailsComponent} from './edit-details/edit-details.component';
import {DetailsComponent} from './details/details.component';
import {DetailsResolve} from './details/details.resolve';
import {EditResolve} from './edit/edit.resolve';

@NgModule({
  imports: [
    CommonModule,
    RoomsRoutingModule,
    RouterModule,
    FormsModule
  ],
  declarations: [
    RoomsComponent,
    AddComponent,
    EditComponent,
    EditDetailsComponent,
    DetailsComponent
  ],
  providers: [
    DetailsResolve,
    EditResolve
  ]
})
export class HotelRoomsModule {
}
