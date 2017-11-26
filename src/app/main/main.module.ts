import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainRoutingModule} from './main-routing/main-routing.module';
import {HomeComponent} from './home/home.component';
import {MainComponent} from './main.component';
import {NavigationComponent} from './navigation/navigation.component';
import {TopNavbarComponent} from './top-navbar/top-navbar.component';
import {SharedModule} from '../shared/shared.module';
import {ToastComponent} from './toast/toast.component';
import {ToastContainerComponent} from './toast-container/toast-container.component';
import {ModalComponent} from './modal/modal.component';
import {CanAccessPipe} from '../filters/can-access.pipe';
import {ProfileComponent} from './profile/profile.component';
import {FormsModule} from '@angular/forms';
import {ErrorModalComponent} from './error-modal/error-modal.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
    MainComponent,
    NavigationComponent,
    TopNavbarComponent,
    ToastComponent,
    ToastContainerComponent,
    ModalComponent,
    CanAccessPipe,
    ProfileComponent,
    ErrorModalComponent
  ],
})
export class MainModule {
}
