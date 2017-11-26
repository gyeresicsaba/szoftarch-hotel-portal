import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Reservation} from '../../../models/reservation';
import {Modal} from '../../../models/modal';
import {ModalService} from '../../../services/modal.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  response: Array<Reservation> = [];

  constructor(private route: ActivatedRoute, private modalService: ModalService,
              private authHttp: CustomAuthHttpService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.response = data.response;
    });
  }

  openDeleteModal(reservation) {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deleteReservation(reservation);
      }
    }]));
  }

  private deleteReservation(reservation) {
    this.authHttp.delete('roomres/' + reservation.id).subscribe(() => {
      const index = this.response.indexOf(reservation);
      this.response.splice(index, 1);
    });
  }

}
