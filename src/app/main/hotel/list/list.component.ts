import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../models/hotel';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  response: Array<Hotel> = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.response = data.response;
    });
  }

  fillArray(count: number): Array<any> {
    return Array(count).fill(1);
  }

}
