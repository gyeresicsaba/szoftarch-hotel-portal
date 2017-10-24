import {Component, OnInit} from '@angular/core';
import {Box} from '../../../models/box';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  box: Box;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {response: Box}) => {
      this.box = data.response;
    });
  }

}
