import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../models/hotel';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  hotel: Hotel;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.hotel = data.response;
    })
  }

}
