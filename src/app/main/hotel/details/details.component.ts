import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {Modal} from '../../../models/modal';
import {ModalService} from '../../../services/modal.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  hotel: Hotel;
  lat = 51.678418;
  lng = 7.809007;

  constructor(private route: ActivatedRoute, private modalService: ModalService,
              private authHttp: CustomAuthHttpService, private router: Router, private http: Http) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.hotel = data.response;
    });

    this.getLocation(this.hotel.address);
  }

  getLocation(address: string) {
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + address + 'CA&sensor=false')
      .subscribe((res) => {
        this.lat = res.json().results[0].geometry.location.lat;
        this.lng = res.json().results[0].geometry.location.lng;
      });
  }

  fillArray(count: number): Array<any> {
    return Array(count).fill(1);
  }

  openDeleteModal() {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deleteHotel();
      }
    }]));
  }

  private deleteHotel() {
    this.authHttp.delete('hotel/' + this.hotel.id).subscribe(() => {
      this.router.navigateByUrl('/hotel');
    });
  }

  openRoomDeleteModal(room) {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deleteRoom(room);
      }
    }]));
  }

  private deleteRoom(room) {
    this.authHttp.delete('room/' + room.id).subscribe(() => {
      const index = this.hotel.rooms.indexOf(room);
      this.hotel.rooms.splice(index, 1);
    });
  }
}
