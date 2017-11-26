import * as moment from 'moment';

export class SearchObject {
  numberOfStars: number;
  numberOfPerson: number;
  price: number;
  checkIn: moment.Moment;
  checkOut: moment.Moment;

  constructor(raw) {
    this.numberOfStars = raw.numberOfStars;
    this.numberOfPerson = raw.numberOfPerson;
    this.price = raw.price;
    this.checkIn = raw.checkIn;
    this.checkOut = raw.checkOut;
  }
}
