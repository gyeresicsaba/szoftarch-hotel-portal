import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {ModalService} from '../../../services/modal.service';
import {Modal} from '../../../models/modal';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {FormControl} from '@angular/forms';
import {SearchObject} from '../../../models/searchObject';
import {IMyOptions} from 'mydatepicker';
import {PickedDate} from '../../../models/picked-date';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  response: Array<Hotel> = [];
  searchControl = new FormControl();
  searchObject: SearchObject;
  starArray: Array<any> = [{name: '1', value: 1}, {name: '2', value: 2}, {name: '3', value: 3}, {
    name: '4',
    value: 4
  }, {name: '5', value: 5}];

  private startDateString: string;
  private endDateString: string;
  startDateModel: {date: PickedDate | {}} = {date: {}};
  endDateModel: {date: PickedDate | {}} = {date: {}};
  startDatePickerOptions: IMyOptions = {
    height: '28px',
    selectionTxtFontSize: '14px',
    editableDateField: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    width: '125px'
  };
  endDatePickerOptions: IMyOptions = {
    height: '28px',
    selectionTxtFontSize: '14px',
    editableDateField: false,
    showClearDateBtn: false,
    openSelectorOnInputClick: true,
    width: '125px'
  };

  constructor(private route: ActivatedRoute, private modalService: ModalService,
              private authHttp: CustomAuthHttpService, private authService: AuthService) {
  }

  ngOnInit() {
    this.searchObject = new SearchObject({});
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
