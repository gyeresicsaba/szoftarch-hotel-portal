import {Injectable} from '@angular/core';
import {Toast} from '../models/toast';
import {ReplaySubject} from 'rxjs/Rx';

@Injectable()
export class ToastService {
  toastsSubject = new ReplaySubject<Toast>();

  constructor() {
  }

  public addToast(toast: Toast) {
    this.toastsSubject.next(toast);
  }
}
