/**
 * Created by ekemate on 2017. 02. 23..
 */
import {ITypeAheadElement} from './typeahead';

export class Partner implements ITypeAheadElement {
  city: string;
  id: number;
  name: string;
  number: string;
  sentable: boolean;
  testable: boolean;


  constructor(raw) {
    this.city = raw.city;
    this.id = raw.id;
    this.name = raw.name;
    this.number = raw.number;
    this.sentable = raw.sentable;
    this.testable = raw.testable;
  }

  get DisplayValue(): string {
    return this.number + ' - ' + this.name;
  }
}
