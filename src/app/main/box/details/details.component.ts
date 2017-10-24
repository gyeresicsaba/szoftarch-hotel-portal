import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Box} from '../../../models/box';
import {ModalService} from '../../../services/modal.service';
import {Modal} from '../../../models/modal';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  box: Box;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: ModalService,
              private authHttp: CustomAuthHttpService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {response: Box}) => {
      this.box = data.response;
    });
  }

  openDeleteModal() {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deletePartner();
      }
    }]));
  }

  private deletePartner() {
    this.authHttp.delete('boxes/' + this.box.id).subscribe(() => {
      this.router.navigateByUrl('box');
    });
  }

}
