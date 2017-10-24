import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {NavigationComponent} from './navigation.component';
import {RouterTestingModule} from '@angular/router/testing';
import {AsyncSubject} from 'rxjs/Rx';
import {User} from '../../models/user';
import {TestData} from '../../../mock/test-data';
import {AuthService} from '../../services/auth.service';
import {CanAccessPipe} from '../../filters/can-access.pipe';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;
  let nativeElement;
  let authServiceStub;


  beforeEach(async(() => {
    authServiceStub = {
      getUser: jasmine.createSpy('getUser'),
      userSubject: new AsyncSubject<User>()
    };
    authServiceStub.userSubject.next(new User(TestData.userResponse.data));
    authServiceStub.userSubject.complete();
    TestBed.configureTestingModule({
      declarations: [
        NavigationComponent,
        CanAccessPipe
      ],
      imports: [
        RouterTestingModule,
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceStub
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user', () => {
    expect(component.user.id).toBe(1);
  });

  it('should display username', () => {
    const unameElement: HTMLElement = nativeElement.querySelector('strong');

    expect(unameElement.innerText).toBe('Admin admin');
  });

});
