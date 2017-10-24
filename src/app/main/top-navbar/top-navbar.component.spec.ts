import {async, ComponentFixture, TestBed, fakeAsync} from '@angular/core/testing';
import {TopNavbarComponent} from './top-navbar.component';
import {AuthService} from '../../services/auth.service';
import {
  ActivatedRoute,
  Router,
  NavigationEnd,
  PRIMARY_OUTLET,
  NavigationStart,
  NavigationCancel
} from '@angular/router';
import {Subject} from 'rxjs/Rx';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedVarsService} from '../../services/shared-vars.service';
import {SpinnerService} from '../../services/spinner.service';
import {MockRouter} from '../../../mock/router.mock';
import {MockSpinnerService} from '../../../mock/spinner-service.mock';

class DummyComponent {
}

describe('TopNavbarComponent', () => {
  let component: TopNavbarComponent;
  let fixture: ComponentFixture<TopNavbarComponent>;
  let nativeElement;
  let authServiceStub;
  let mockRouter: MockRouter;
  let subject;
  let activatedRouteStub;
  let mockSpinner: MockSpinnerService;

  beforeEach(async(() => {
    authServiceStub = {
      logOut: jasmine.createSpy('logOut'),
    };
    mockRouter = new MockRouter();
    activatedRouteStub = {
      root: {
        children: [
          {
            outlet: PRIMARY_OUTLET,
            snapshot: {
              data: {
                breadcrumb: 'Home'
              },
              url: ['home']
            },
            children: []
          }
        ]
      }
    };
    mockSpinner = new MockSpinnerService();

    TestBed.configureTestingModule({
      declarations: [TopNavbarComponent],
      imports: [
        RouterTestingModule.withRoutes([
          {path: '', component: DummyComponent}
        ]),
      ],
      providers: [
        SharedVarsService,
        {
          provide: AuthService,
          useValue: authServiceStub
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub
        },
        {
          provide: SpinnerService,
          useValue: mockSpinner
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavbarComponent);
    component = fixture.componentInstance;
    subject = new Subject();
    Object.defineProperty(Router.prototype, 'events', {value: subject});
    fixture.detectChanges();
    nativeElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call logout', () => {
    const logout: HTMLElement = nativeElement.querySelector('#log-out');
    logout.click();

    expect(authServiceStub.logOut).toHaveBeenCalled();
  });

  it('should display breadcrumb', fakeAsync(() => {
    subject.next(new NavigationEnd(1, '', ''));
    fixture.detectChanges();
    const breadcrumb: HTMLElement = nativeElement.querySelector('#breadcrumb');
    expect(breadcrumb.innerHTML).toContain('Home');
  }));

  it('should set spinner', fakeAsync(() => {
    subject.next(new NavigationStart(1, ''));
    fixture.detectChanges();
    // IRL it should not get "NavigationStart" event on ngInit
    expect(mockSpinner.incrementCounter).toHaveBeenCalledTimes(1);
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(0);

    subject.next(new NavigationCancel(1, '', ''));
    fixture.detectChanges();
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(1);

    subject.next(new NavigationEnd(1, '', ''));
    fixture.detectChanges();
    expect(mockSpinner.decrementCounter).toHaveBeenCalledTimes(2);
  }));
});
