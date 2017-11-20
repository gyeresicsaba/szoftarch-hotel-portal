import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {Modal} from '../../../models/modal';
import {ModalService} from '../../../services/modal.service';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  hotel: Hotel;

  constructor(private route: ActivatedRoute, private modalService: ModalService,
              private authHttp: CustomAuthHttpService, private router: Router) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.hotel = data.response;
    })
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
}
