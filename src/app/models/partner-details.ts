/**
 * Created by ekemate on 2017. 02. 28..
 */
import {Partner} from './partner';
import * as moment from 'moment';
import {Payer} from './payer';

export class PartnerDetails extends Partner {
  comment: string;
  door_number: string;
  email: string;
  floor_number: string;
  house_number: string;
  modified_at: moment.Moment;
  modified_by: string;
  phone: string;
  postal_code: number;
  public_space: string;
  public_space_type: string;
  registration_number: string;
  tax_number: string;

  constructor(raw) {
    super(raw);

    this.comment = raw.comment;
    this.door_number = raw.door_number;
    this.email = raw.email;
    this.floor_number = raw.floor_number;
    this.house_number = raw.house_number;
    this.modified_at = moment(raw.modified_at);
    this.modified_by = raw.modified_by;
    this.phone = raw.phone;
    this.postal_code = raw.postal_code;
    this.public_space = raw.public_space;
    this.public_space_type = raw.public_space_type;
    this.registration_number = raw.registration_number;
    this.tax_number = raw.tax_number;
  }

  //noinspection JSUnusedGlobalSymbols
  get formattedModifiedAt(): string {
    return this.modified_at.format('YYYY-MM-DD hh:mm');
  }

  get FullAddress(): string {
    return this.postal_code + ' ' + this.city + ', ' + this.public_space + ' '
    + this.public_space_type + ' ' + this.house_number + '. ' +
    this.floor_number ? this.floor_number + '. emelet ' + this.door_number : '';
  }

  get ToPayer(): Payer {
    return new Payer({
      address: this.FullAddress,
      email: this.email,
      id: this.id,
      isDefault: false,
      name: this.name,
      phone: this.phone
    });
  }
}
