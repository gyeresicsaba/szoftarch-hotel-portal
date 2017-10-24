/**
 * Created by ekemate on 2017. 03. 08..
 */
export class MockModalService {
  open = jasmine.createSpy('open');
  close = jasmine.createSpy('close');
  getIsVisible = jasmine.createSpy('IsVisible');
  getModalData = jasmine.createSpy('ModalData');
  openError = jasmine.createSpy('openError');
  closeError = jasmine.createSpy('closeError');
  getIsErrorVisible = jasmine.createSpy('getIsErrorVisible');
  getErrorModalData = jasmine.createSpy('getErrorModalData');

  get IsVisible() {
    return this.getIsVisible();
  }

  get IsErrorVisible() {
    return this.getIsErrorVisible();
  }

  get ModalData() {
    return this.getModalData();
  }

  get ErrorModalData() {
    return this.getErrorModalData();
  }

  constructor() {
  }
}
