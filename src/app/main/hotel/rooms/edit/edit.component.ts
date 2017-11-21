import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Room} from '../../../../models/room';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  room: Room;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.room = data.response;
    });
  }

}
