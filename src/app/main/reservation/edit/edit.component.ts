import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Reservation} from '../../../models/reservation';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  reservation: Reservation;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.reservation = data.response;
    });
  }

}
