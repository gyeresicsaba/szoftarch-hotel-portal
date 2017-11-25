import * as moment from 'moment';

export class Reservation {
  id: number;
  numberOfPeople: number;
  checkIn: moment.Moment;
  checkOut: moment.Moment;
  roomId: number;
  userId: string;

  constructor(raw) {
    this.id = raw.id;
    this.numberOfPeople = raw.numberOfPeople;
    this.checkIn = raw.checkIn;
    this.checkOut = raw.checkOut;
    this.roomId = raw.roomId;
    this.userId = raw.userId;
  }
}
