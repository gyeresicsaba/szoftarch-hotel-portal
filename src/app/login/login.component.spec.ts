/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import {LoginComponent} from './login.component';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Rx';
import {AppModule} from '../app.module';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authStub;

  beforeEach(async(() => {
    authStub = {
      logIn: jasmine.createSpy('logIn').and.returnValue(Observable.of({}))
    };
    TestBed.configureTestingModule({
      imports: [AppModule, RouterTestingModule],
      providers: [
        {provide: AuthService, useValue: authStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login', fakeAsync(() => {
    spyOn(Router.prototype, 'navigateByUrl');
    component.onSubmit();
    expect(authStub.logIn).toHaveBeenCalled();
    expect(Router.prototype.navigateByUrl).toHaveBeenCalledWith('');
    const href = fixture.debugElement.query(By.css('a')).nativeElement
      .getAttribute('href');
    expect(href).toEqual('/password');
  }));

  it('should display error', fakeAsync(() => {
    authStub.logIn.and.callFake(() => {
      return new Observable((observer) => {
        observer.error();
      });
    });

    component.onSubmit();

    expect(authStub.logIn).toHaveBeenCalled();
    expect(component.loginError).toBe(true);
  }));

});
