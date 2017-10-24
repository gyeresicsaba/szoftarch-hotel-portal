import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MainComponent} from './main.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MainModule} from './main.module';
import {User} from '../models/user';
import {AsyncSubject, Observable} from 'rxjs/Rx';
import {AuthService} from '../services/auth.service';
import {SpinnerService} from '../services/spinner.service';
import {SharedVarsService} from '../services/shared-vars.service';
import {ToastService} from '../services/toast.service';
import {ModalService} from '../services/modal.service';
import {TestData} from '../../mock/test-data';
import {CustomAuthHttpService} from '../services/custom-auth-http.service';
import {MockCustomAuthHttpService} from '../../mock/custom-auth-http-service.mock';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let authServiceStub;
  let mockAuthHttp: MockCustomAuthHttpService;

  beforeEach(async(() => {
    mockAuthHttp = new MockCustomAuthHttpService();
    authServiceStub = {
      getUser: jasmine.createSpy('getUser'),
      userSubject: new AsyncSubject<User>()
    };
    authServiceStub.userSubject.next(new User(TestData.userResponse.data));
    authServiceStub.userSubject.complete();

    TestBed.configureTestingModule({
      imports: [
        MainModule,
        RouterTestingModule,
      ],
      providers: [
        SharedVarsService,
        ToastService,
        ModalService,
        {
          provide: CustomAuthHttpService,
          useValue: mockAuthHttp
        },
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: SpinnerService,
          useValue: {
            getSpinnerCounter: () => Observable.of(1),
            incrementCounter: jasmine.createSpy('incrementCounter')
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    mockAuthHttp.get.and.returnValue(Observable.of({version: '0.8.0'}));
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get apiVersion', () => {
    expect(component.apiVersion).toEqual('0.8.0');
  });
});
