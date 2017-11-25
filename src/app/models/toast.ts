import {BootstrapTypes} from './bootstrap-types';

export class Toast {
  type: BootstrapTypes;
  title?: string;
  message?: string;
  timeOut: number;
  visible: boolean;

  constructor(type: BootstrapTypes, title?: string, message?: string, timeOut?: number) {
    this.type = type;
    this.title = title;
    this.message = message;
    this.timeOut = timeOut || 400;
    this.visible = true;
  }
}
