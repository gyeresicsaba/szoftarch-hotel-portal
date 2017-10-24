import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs/Rx';
import {Modal} from '../models/modal';
import {ErrorModal} from '../models/error-modal';

@Injectable()
export class ModalService {
  private _isVisible = new BehaviorSubject<boolean>(false);
  private _modalData = new Subject<Modal>();
  private _isErrorVisible = new BehaviorSubject<boolean>(false);
  private _errorModalData = new Subject<ErrorModal>();

  constructor() {
  }

  public get IsVisible(): BehaviorSubject<boolean> {
    return this._isVisible;
  }

  public get ModalData(): Subject<Modal> {
    return this._modalData;
  }

  public open(modalData: Modal) {
    this._modalData.next(modalData);
    this._isVisible.next(true);
  }

  public close() {
    this._isVisible.next(false);
  }

  public get IsErrorVisible(): BehaviorSubject<boolean> {
    return this._isErrorVisible;
  }

  public get ErrorModalData(): Subject<ErrorModal> {
    return this._errorModalData;
  }

  public openError(modalData: ErrorModal) {
    this._errorModalData.next(modalData);
    this._isErrorVisible.next(true);
  }

  public closeError() {
    this._isErrorVisible.next(false);
  }
}
