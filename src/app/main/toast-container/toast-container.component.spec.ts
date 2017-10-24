import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {ToastContainerComponent} from './toast-container.component';
import {ToastFilterPipe} from '../../filters/toast.pipe';
import {ToastService} from '../../services/toast.service';
import {ToastComponent} from '../toast/toast.component';
import {ReplaySubject} from 'rxjs/Rx';
import {Toast} from '../../models/toast';
import {BootstrapTypes} from '../../models/bootstrap-types';

describe('ToastContainerComponent', () => {
  let component: ToastContainerComponent;
  let fixture: ComponentFixture<ToastContainerComponent>;
  let toastServiceStub;
  let toast: Toast;

  beforeEach(async(() => {
    toastServiceStub = {
      toastsSubject: new ReplaySubject<Toast>()
    };
    toast = new Toast(BootstrapTypes.success);
    TestBed.configureTestingModule({
      declarations: [ToastContainerComponent, ToastFilterPipe, ToastComponent],
      providers: [
        {
          provide: ToastService,
          useValue: toastServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get toast', fakeAsync(() => {
    toastServiceStub.toastsSubject.next(toast);
    tick();
    expect(component.toasts.length).toBe(1);
  }));

  it('should hide toast', () => {
    component.toasts.push(toast);
    component.hide(toast);
    expect(component.toasts[0].visible).toBe(false);
  });
});
