import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {ModalService} from '../../../services/modal.service';
import {Modal} from '../../../models/modal';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  response: Array<Hotel> = [];

  constructor(private route: ActivatedRoute, private modalService: ModalService,
              private authHttp: CustomAuthHttpService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.response = data.response;
    });
  }

  fillArray(count: number): Array<any> {
    return Array(count).fill(1);
  }

  openDeleteModal(hotel) {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deleteHotel(hotel);
      }
    }]));
  }

  private deleteHotel(hotel) {
    this.authHttp.delete('hotel/' + hotel.id).subscribe(() => {
      const index = this.response.indexOf(hotel);
      this.response.splice(index, 1);
    });
  }

}
