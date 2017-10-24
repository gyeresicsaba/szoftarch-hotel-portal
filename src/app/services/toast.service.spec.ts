import {TestBed, inject} from '@angular/core/testing';
import {ToastService} from './toast.service';
import {Toast} from '../models/toast';
import {BootstrapTypes} from '../models/bootstrap-types';

describe('ToastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToastService]
    });
  });

  it('should create', inject([ToastService], (service: ToastService) => {
    expect(service).toBeTruthy();
  }));

  it('should add', inject([ToastService], (service: ToastService) => {
    const toast = new Toast(BootstrapTypes.success, '1');

    service.addToast(toast);

    service.toastsSubject.subscribe(gotToast => {
      expect(gotToast).toEqual(toast);
    });
  }));
});
