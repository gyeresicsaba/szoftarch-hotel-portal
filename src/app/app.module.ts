import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppRouterModule} from './app-router/app-router.module';
import {LoggedInGuardService} from './services/logged-in-guard.service';
import {JwtHelper} from 'angular2-jwt';
import {AuthService} from './services/auth.service';
import {AuthGuardService} from './services/auth-guard.service';
import {CustomAuthHttpService} from './services/custom-auth-http.service';
import {AuthModule} from './auth/auth.module';
import {SpinnerService} from './services/spinner.service';
import {SharedVarsService} from './services/shared-vars.service';
import {ToastService} from './services/toast.service';
import {ModalService} from './services/modal.service';
import {FileUploadModule} from 'ng2-file-upload';
import {SharedModule} from './shared/shared.module';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouterModule,
    AuthModule,
    FileUploadModule,
    SharedModule
  ],
  providers: [
    LoggedInGuardService,
    JwtHelper,
    AuthService,
    AuthGuardService,
    CustomAuthHttpService,
    SpinnerService,
    SharedVarsService,
    ToastService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
/**
 * Main module of the app
 */
export class AppModule {
}
