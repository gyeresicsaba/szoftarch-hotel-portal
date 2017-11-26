import {Component, OnInit} from '@angular/core';
import {Room} from '../../../../models/room';
import {ActivatedRoute, Router} from '@angular/router';
import {Modal} from '../../../../models/modal';
import {ModalService} from '../../../../services/modal.service';
import {CustomAuthHttpService} from '../../../../services/custom-auth-http.service';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  room: Room;

  constructor(private route: ActivatedRoute, private modalService: ModalService,
              private authHttp: CustomAuthHttpService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.room = data.response;
    });
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
    this.authHttp.delete('room/' + this.room.id).subscribe(() => {
      this.router.navigateByUrl('/hotel/' + this.route.snapshot.parent.params.id);
    });
  }
}
