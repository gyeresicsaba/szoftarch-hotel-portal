import {Component, OnInit} from '@angular/core';
import {ModalService} from '../../services/modal.service';
import {ErrorModal} from '../../models/error-modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  visible = false;
  modal: ErrorModal;

  constructor(private modalService: ModalService) {
  }

  ngOnInit() {
    this.modalService.IsErrorVisible.subscribe(visible => {
      this.visible = visible;
    });

    this.modalService.ErrorModalData.subscribe(modal => {
      this.modal = modal;
    });
  }

  close() {
    this.modalService.closeError();
  }

}
