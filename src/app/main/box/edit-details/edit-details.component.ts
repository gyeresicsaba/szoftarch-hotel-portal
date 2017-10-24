import {Component, Input, OnInit} from '@angular/core';
import {Box} from '../../../models/box';
import {PickedDate} from '../../../models/picked-date';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import * as moment from 'moment';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {ToastService} from '../../../services/toast.service';
import {Toast} from '../../../models/toast';
import {BootstrapTypes} from '../../../models/bootstrap-types';
import {Router} from '@angular/router';
import {PaginatedResponse} from '../../../models/paginated-response';
import {Subject, Subscription} from 'rxjs/Rx';
import {Partner} from '../../../models/partner';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {

  box: Box;
  @Input() boxInput: Box;
  isNew = true;
  resetSubject = new Subject();
  response: PaginatedResponse<Partner>;
  searchString: string;
  selected: Partner;
  tempBoxNumber: string;
  private subscription: Subscription;

  leaveDateModel: {date: PickedDate | {}} = {date: {}};
  arrivalDateModel: {date: PickedDate | {}} = {date: {}};
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

  constructor(private authHttp: CustomAuthHttpService, private toastService: ToastService, private router: Router) {
  }

  ngOnInit() {
    this.response = <PaginatedResponse<Partner>>{data: []};
    if (this.boxInput) {
      this.box = this.boxInput;
      this.tempBoxNumber = this.box.box_number.substring(1);
      this.isNew = false;
      if (this.box.out !== undefined) {
        this.leaveDateModel.date = new PickedDate(this.box.out);
      }
      if (this.box.in !== undefined) {
        this.arrivalDateModel.date = new PickedDate(this.box.in);
      }
    } else {
      //noinspection ReservedWordAsName
      this.box = new Box({box_number: 'M', in: null, out: null});
      this.box.postage = false;
    }
  }

  boxNumberChange(boxNumber) {
    this.box.box_number = this.box.box_number[0] + boxNumber;
  }

  pickerStartDateChange(event: IMyDateModel) {
    this.box.out = moment(event.formatted);
  }

  pickerEndDateChange(event: IMyDateModel) {
    this.box.in = moment(event.formatted);
  }

  onSubmit() {
    if (this.isNew) {
      //noinspection JSUnusedLocalSymbols
      this.authHttp.post('boxes', this.box.Saveable).subscribe((response: {status: string, id: number}) => {
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
        this.router.navigateByUrl('/box/list');
      });
    } else {
      //noinspection JSUnusedLocalSymbols
      this.authHttp.put('boxes/' + this.box.id, this.box.Saveable).subscribe((response: {status: string, id: number}) => {
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
      });
    }
  }

  getPartners(query: string) {
    this.searchString = query;
    if (this.searchString && this.searchString.length > 0 && !this.selected) {
      const url = 'partners?sort="name"&q=' + this.searchString;
      this.subscription = this.authHttp.get(url)
        .map(list => new PaginatedResponse<Partner>(list, Partner))
        .subscribe(response => {
          this.response = response;
        });
    }
  }

  select(partner: Partner) {
    this.selected = partner;
    if (partner) {
      this.box.partner_id = partner.id;
      this.box.partner_name = partner.name;
      this.box.partner_number = partner.number;
    } else {
      this.box.partner_id = null;
      this.box.partner_name = null;
      this.box.partner_number = null;
    }
  }

}
