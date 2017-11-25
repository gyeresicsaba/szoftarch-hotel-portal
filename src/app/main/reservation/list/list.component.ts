import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Reservation} from '../../../models/reservation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  response: Array<Reservation> = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.response = data.response;
    });
  }

}
