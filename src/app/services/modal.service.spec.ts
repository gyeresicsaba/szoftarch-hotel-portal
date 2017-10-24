import {TestBed, inject} from '@angular/core/testing';
import {ModalService} from './modal.service';
import {Modal} from '../models/modal';

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalService]
    });
  });

  it('should ...', inject([ModalService], (service: ModalService) => {
    expect(service).toBeTruthy();
  }));

  it('should open', inject([ModalService], (service: ModalService) => {
    const testModal = new Modal('', '', []);
    service.ModalData.subscribe(modal => {
      expect(modal).toBe(testModal);
    });
    service.open(testModal);
    service.IsVisible.subscribe(value => {
      expect(value).toBe(true);
    });
  }));

  it('should close', inject([ModalService], (service: ModalService) => {
    service.close();
    service.IsVisible.subscribe(value => {
      expect(value).toBe(false);
    });
  }));
});
