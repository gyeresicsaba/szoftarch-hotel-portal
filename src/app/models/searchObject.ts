import * as moment from 'moment';

export class SearchObject {
  numberOfStars: number;
  numberOfPerson: number;
  price: number;
  startDate: moment.Moment;
  endDate: moment.Moment;

  constructor(raw) {
    this.numberOfStars = raw.numberOfStars;
    this.numberOfPerson = raw.numberOfPerson;
    this.price = raw.price;
    this.startDate = raw.startDate;
    this.endDate = raw.endDate;
  }
}
