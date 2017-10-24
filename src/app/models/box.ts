import * as moment from 'moment';
import {BoxBase} from './box-base';
export class Box extends BoxBase {
  id: number;
  //noinspection ReservedWordAsName
  in: moment.Moment;
  out: moment.Moment;
  box_number: string;
  partner_id: number;
  pipe_in: number;
  pipe_out: number;
  battery_in: number;
  battery_out: number;
  postage: boolean;
  comment: string;

  constructor(raw) {
    super(raw);

    this.id = raw.id;
    if (moment(raw.in).isValid()) {
      this.in = moment(raw.in);
    }
    if (moment(raw.out).isValid()) {
      this.out = moment(raw.out);
    }
    this.box_number = raw.box_number;
    this.partner_id = raw.partner_id;
    this.pipe_in = raw.pipe_in;
    this.pipe_out = raw.pipe_out;
    this.battery_in = raw.battery_in;
    this.battery_out = raw.battery_out;
    this.postage = raw.postage;
    this.comment = raw.comment;
  }

  //noinspection JSUnusedGlobalSymbols
  get formattedOut(): string {
    if (this.out !== undefined) {
      return this.out.format('YYYY.MM.DD');
    }
  }

  //noinspection JSUnusedGlobalSymbols
  get formattedIn(): string {
    if (this.in !== undefined) {
      return this.in.format('YYYY.MM.DD');
    }
  }

  get Saveable() {
    //noinspection ReservedWordAsName
    return {
      id: this.id,
      in: this.in ? this.in.format('YYYY.MM.DD') : this.in,
      out: this.out ? this.out.format('YYYY.MM.DD') : this.out,
      box_number: this.box_number,
      partner_id: this.partner_id,
      partner_name: this.partner_name,
      partner_number: this.partner_number,
      pipe_in: this.pipe_in,
      pipe_out: this.pipe_out,
      pipe_diff: this.pipe_diff,
      battery_in: this.battery_in,
      battery_out: this.battery_out,
      battery_diff: this.battery_diff,
      postage: this.postage,
      comment: this.comment
    };
  }
}
