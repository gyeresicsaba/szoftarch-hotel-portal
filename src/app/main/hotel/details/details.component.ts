import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../models/hotel';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  hotel: Hotel;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.hotel = data.response;
    })
  }

}
