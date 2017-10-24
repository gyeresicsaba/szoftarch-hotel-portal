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
import {AnalysisDataService} from './main/examination-shared/analysis-data.service';
import {PasswordReminderComponent} from './password-reminder/password-reminder.component';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {SharedModule} from './shared/shared.module';
import {PrintComponent} from './print/print.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PasswordReminderComponent,
    PasswordResetComponent,
    PrintComponent
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
    ModalService,
    AnalysisDataService
  ],
  bootstrap: [AppComponent]
})
/**
 * Main module of the app
 */
export class AppModule {
}
