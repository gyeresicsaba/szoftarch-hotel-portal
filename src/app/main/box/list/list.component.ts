import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PaginatedResponse} from '../../../models/paginated-response';
import {Box} from '../../../models/box';
import {PickedDate} from '../../../models/picked-date';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs/Rx';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {Modal} from '../../../models/modal';
import {ModalService} from '../../../services/modal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

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

  subscription: Subscription;
  partnerNumberSearchControl = new FormControl();
  boxNumberSearchControl = new FormControl();
  partnerSearchString = '';
  boxSearchString = '';
  response;
  page = 1;

  constructor(private route: ActivatedRoute, private authHttp: CustomAuthHttpService, private modalService: ModalService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data: {response: PaginatedResponse<Box>}) => {
      this.response = data.response;
    });

    this.partnerNumberSearchControl.valueChanges.debounceTime(500).subscribe(value => {
      this.searchPartner(value);
    });
    this.boxNumberSearchControl.valueChanges.debounceTime(500).subscribe(value => {
      this.searchBox(value);
    });
  }

  pickerStartDateChange(event: IMyDateModel) {
    this.startDateString = event.formatted;
    this.getList();
  }

  pickerEndDateChange(event: IMyDateModel) {
    this.endDateString = event.formatted;
    this.getList();
  }

  private searchPartner(str: string) {
    this.partnerSearchString = str;
    this.page = 1;
    this.getList();
  }

  private searchBox(str: string) {
    this.boxSearchString = str;
    this.page = 1;
    this.getList();
  }

  getList() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    let url = 'boxes?page=' + this.page;
    if (this.partnerSearchString.length) {
      url += '&qpartner=' + this.partnerSearchString;
    }
    if (this.boxSearchString.length) {
      url += '&qbox=' + this.boxSearchString;
    }
    if (typeof this.startDateString !== 'undefined') {
      url += '&start_date=' + this.startDateString;
    }
    if (typeof this.endDateString !== 'undefined') {
      url += '&end_date=' + this.endDateString;
    }
    this.subscription = this.authHttp.get(url)
      .map(list => new PaginatedResponse<Box>(list, Box))
      .subscribe(response => {
        this.response = response;
      });
  }

  openDeleteModal(box) {
    this.modalService.open(new Modal('Törlés', 'Biztos törölni szeretné?', [{
      text: 'Törlés',
      classes: 'btn-danger',
      callback: () => {
        this.modalService.close();
        this.deletePartner(box);
      }
    }]));
  }

  private deletePartner(box) {
    this.authHttp.delete('boxes/' + box.id).subscribe(() => {
      const index = this.response.data.indexOf(box);
      this.response.data.splice(index, 1);
    });
  }

}
