/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';
import {AppModule} from '../app.module';
import {PasswordReminderComponent} from './password-reminder.component';
import {Http} from '@angular/http';

describe('PasswordReminderComponent', () => {
  let component: PasswordReminderComponent;
  let fixture: ComponentFixture<PasswordReminderComponent>;
  let authStub;
  let httpStub;

  beforeEach(async(() => {
    httpStub = {get: jasmine.createSpy('get'), post: jasmine.createSpy('post')};
    authStub = {
      logIn: jasmine.createSpy('logIn').and.returnValue(Observable.of({}))
    };
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: AuthService, useValue: authStub},
        {provide: Http, useValue: httpStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should send email', async(() => {
    httpStub.post.and.returnValue(Observable.of(''));
    component.onSubmit();

    expect(httpStub.post).toHaveBeenCalled();
  }));

  it('should display error', async(() => {
    httpStub.post.and.returnValue(Observable.throw('error'));
    component.onSubmit();

    expect(component.loginError).toBe(true);
  }));
});
