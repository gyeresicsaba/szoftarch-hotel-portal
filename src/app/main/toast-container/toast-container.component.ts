import {Component, OnInit} from '@angular/core';
import {Toast} from '../../models/toast';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  styleUrls: ['./toast-container.component.scss']
})
export class ToastContainerComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
    this.toastService.toastsSubject.subscribe((toast: Toast) => {
      this.toasts.push(toast);
    });
  }

  hide(toast: Toast) {
    const index = this.toasts.indexOf(toast);
    this.toasts[index].visible = false;
  }
}
