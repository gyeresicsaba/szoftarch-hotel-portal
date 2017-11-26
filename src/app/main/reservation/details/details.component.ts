import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {Reservation} from '../../../models/reservation';
import {Modal} from '../../../models/modal';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  reservation: Reservation;

  constructor(private route: ActivatedRoute, private authHttp: CustomAuthHttpService,
              private modalService: ModalService, private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.reservation = data.response;
    });
  }

  openDeleteModal() {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deleteReservation();
      }
    }]));
  }

  private deleteReservation() {
    this.authHttp.delete('roomres/' + this.reservation.id).subscribe(() => {
      this.router.navigateByUrl('/reservation');
    });
  }
}
