import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {Modal} from '../../models/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  visible = false;
  modal: Modal;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.IsVisible.subscribe(visible => {
      this.visible = visible;
    });

    this.modalService.ModalData.subscribe(modal => {
      this.modal = modal;
    });
  }

  close() {
    this.modalService.close();
  }
}
