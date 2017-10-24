import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Toast} from '../../models/toast';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() toast: Toast;
  @Output() hide = new EventEmitter<Toast>();
  percentage: number;
  private intervalTime = 4;

  constructor() {
  }

  ngOnInit() {
    if (this.toast.timeOut) {
      this.percentage = 100;
      const unit = (this.percentage / this.toast.timeOut) * this.intervalTime;
      const interval = setInterval(() => {
        this.percentage = this.percentage - unit;
        if (this.percentage <= 0) {
          clearInterval(interval);
          this.close();
        }
      }, this.intervalTime);
    }
  }

  close() {
    this.hide.emit(this.toast);
  }
}
