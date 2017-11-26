import * as moment from 'moment';
import {Hotel} from './hotel';
import {Room} from './room';

export class Reservation {
  id: number;
  numberOfPeople: number;
  checkIn: moment.Moment;
  checkOut: moment.Moment;
  roomId: number;
  userId: string;
  hotel: Hotel;
  room: Room;

  constructor(raw) {
    this.id = raw.id;
    this.numberOfPeople = raw.numberOfPeople;
    this.checkIn = moment(raw.checkIn);
    this.checkOut = moment(raw.checkOut);
    this.roomId = raw.roomId;
    this.userId = raw.userId;
    this.hotel = raw.hotel;
    this.room = raw.room;
  }

  get FormattedCheckIn(): string {
    return this.checkIn.format('YYYY-MM-DD');
  }

  get FormattedCheckOut(): string {
    return this.checkOut.format('YYYY-MM-DD');
  }

  get Saveable() {
    return {
      roomId: this.room.id,
      userId: this.userId,
      numberOfPeople: this.numberOfPeople,
      checkIn: this.checkIn,
      checkOut: this.checkOut
    }
  }
}
