import {Component, Input, OnInit} from '@angular/core';
import {Reservation} from '../../../models/reservation';
import {ActivatedRoute} from '@angular/router';
import {Hotel} from '../../../models/hotel';
import {Room} from '../../../models/room';
import {IMyDateModel, IMyOptions} from 'mydatepicker';
import {PickedDate} from '../../../models/picked-date';
import * as moment from 'moment';
import {CustomAuthHttpService} from '../../../services/custom-auth-http.service';
import {BootstrapTypes} from '../../../models/bootstrap-types';
import {Toast} from '../../../models/toast';
import {ToastService} from '../../../services/toast.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.scss']
})
export class EditDetailsComponent implements OnInit {
  @Input() reservationInput?: Reservation;
  reservation: Reservation;
  isNew = true;
  hotels: Array<Hotel> = [];
  rooms: Array<Room> = [];

  private startDateString: string;
  private endDateString: string;
  startDateModel: { date: PickedDate | {} } = {date: {}};
  endDateModel: { date: PickedDate | {} } = {date: {}};
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


  constructor(private route: ActivatedRoute, private authHttp: CustomAuthHttpService, private toastService: ToastService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.hotels = data.hotels;
    });
    if (this.reservationInput) {
      this.reservation = this.reservationInput;
      this.isNew = false;
    } else {
      this.reservation = new Reservation({});
      this.reservation.userId = this.authService.user.id;
      this.startDateModel.date = this.reservation.checkIn;
      this.endDateModel.date = this.reservation.checkOut;
    }
  }

  getRooms(event) {
    this.rooms = event.rooms;
  }

  pickerStartDateChange(event: IMyDateModel) {
    this.reservation.checkIn = moment(event.jsdate);
    this.endDatePickerOptions.disableUntil = new PickedDate(this.reservation.checkIn);
    this.endDatePickerOptions = Object.assign({}, this.endDatePickerOptions);
  }

  pickerEndDateChange(event: IMyDateModel) {
    this.reservation.checkOut = moment(event.jsdate);
    const tempMoment = moment(event.jsdate);
    this.startDatePickerOptions.disableSince = new PickedDate(tempMoment.subtract(1, 'day'));
    this.startDatePickerOptions = Object.assign({}, this.startDatePickerOptions);
  }

  onSubmit() {
    if (this.isNew) {
      this.authHttp.post('roomRes', this.reservation.Saveable).subscribe(() => {
        this.toastService.addToast(new Toast(BootstrapTypes.success, 'Sikeres mentés!', '', 3000));
      });
    }
  }
}
