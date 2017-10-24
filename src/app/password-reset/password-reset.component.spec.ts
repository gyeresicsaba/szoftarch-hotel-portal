/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';
import {AppModule} from '../app.module';
import {ActivatedRoute} from '@angular/router';
import {PasswordResetComponent} from './password-reset.component';
import {Http} from '@angular/http';

describe('PasswordResetComponent', () => {
  let component: PasswordResetComponent;
  let fixture: ComponentFixture<PasswordResetComponent>;
  let authStub;
  let httpStub;
  let activatedRouteStub;

  beforeEach(async(() => {
    activatedRouteStub = {
      queryParams: Observable.of('token=kmdfsfkdnkdfskm')
    };
    httpStub = {get: jasmine.createSpy('get'), post: jasmine.createSpy('post')};
    authStub = {
      logIn: jasmine.createSpy('logIn').and.returnValue(Observable.of({}))
    };
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {provide: AuthService, useValue: authStub},
        {provide: ActivatedRoute, useValue: activatedRouteStub},
        {provide: Http, useValue: httpStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetComponent);
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
