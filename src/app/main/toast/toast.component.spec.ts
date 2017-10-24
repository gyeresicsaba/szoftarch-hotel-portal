import {async, ComponentFixture, TestBed, fakeAsync, tick} from '@angular/core/testing';
import {ToastComponent} from './toast.component';
import {Toast} from '../../models/toast';
import {BootstrapTypes} from '../../models/bootstrap-types';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToastComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.toast = new Toast(BootstrapTypes.success);
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should close on timeout', fakeAsync(() => {
    spyOn(component, 'close');
    component.toast = new Toast(BootstrapTypes.success, '', '', 20);
    fixture.detectChanges();
    tick(30);
    fixture.detectChanges();
    expect(component.percentage).toBeLessThanOrEqual(0);
    expect(component.close).toHaveBeenCalledTimes(1);
  }));

  it('should emit on close', () => {
    const toast = new Toast(BootstrapTypes.success);
    spyOn(component.hide, 'emit');
    component.toast = toast;
    fixture.detectChanges();
    component.close();

    expect(component.hide.emit).toHaveBeenCalledWith(toast);
  });
});
