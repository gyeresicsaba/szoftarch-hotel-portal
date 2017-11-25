import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from '../../../models/reservation';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  @Input() reservationInput?: Reservation;
  reservation: Reservation;
  isNew = true;

  constructor() {
  }

  ngOnInit() {
    if (this.reservationInput) {
      this.reservation = this.reservationInput;
      this.isNew = false;
    } else {
      this.reservation = new Reservation({});
    }
  }

}
