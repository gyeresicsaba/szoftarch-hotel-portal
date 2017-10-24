import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Injectable} from '@angular/core';

@Injectable()
export class SpinnerService {
  private _spinnerCounters: {[spinnerId: string]: number} = {};
  private _spinnerSubjects: {[spinnerId: string]: BehaviorSubject<number>} = {};

  public incrementCounter(spinnerId: string) {
    if (this._spinnerCounters.hasOwnProperty(spinnerId)) {
      this._spinnerCounters[spinnerId]++;
    } else {
      this._spinnerCounters[spinnerId] = 1;
    }
    this.getSpinnerCounter(spinnerId).next(this._spinnerCounters[spinnerId]);
  }

  public decrementCounter(spinnerId: string) {
    if (this._spinnerCounters.hasOwnProperty(spinnerId) && this._spinnerCounters[spinnerId] > 0) {
      this._spinnerCounters[spinnerId]--;
    }
    this.getSpinnerCounter(spinnerId).next(this._spinnerCounters[spinnerId]);
  }

  public getSpinnerCounter(spinnerId: string): BehaviorSubject<number> {
    if (this._spinnerSubjects.hasOwnProperty(spinnerId)) {
      return this._spinnerSubjects[spinnerId];
    } else {
      return this._spinnerSubjects[spinnerId] = new BehaviorSubject<number>(0);
    }
  }
}
