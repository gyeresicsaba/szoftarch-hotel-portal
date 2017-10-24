/**
 * Created by ekemate on 2017. 03. 01..
 */
import * as moment from 'moment';
import {ItemNumber} from './item-number';

export class Contract {
  end: moment.Moment;
  id: number;
  item_numbers: ItemNumber[];
  name: string;
  start: moment.Moment;

  static copyConstructor(contract: Contract) {
    return new Contract({
      end: contract.end,
      id: contract.id,
      item_numbers: Object.assign([], contract.item_numbers),
      name: contract.name,
      start: contract.start
    });
  }

  constructor(raw) {
    this.end = moment(raw.end);
    this.id = raw.id;
    this.item_numbers = raw.item_numbers.map(item => new ItemNumber(item));
    this.name = raw.name;
    this.start = moment(raw.start);
  }

  get FormattedStart(): string {
    return this.start.format('YYYY-MM-DD');
  }

  get FormattedEnd(): string {
    return this.end.format('YYYY-MM-DD');
  }

  get Saveable(): {end: string, id: number, item_numbers: Number[], name: string, start: string} {
    return {
      end: this.FormattedEnd,
      id: this.id,
      item_numbers: this.item_numbers.map(itemNumber => itemNumber.id),
      name: this.name,
      start: this.FormattedStart
    };
  }

  copy(contract: Contract) {
    this.end = contract.end;
    this.id = contract.id;
    this.item_numbers = contract.item_numbers;
    this.name = contract.name;
    this.start = contract.start;
  }
}
