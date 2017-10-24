/**
 * Created by ekemate on 2017. 02. 17..
 */
import {ITypeAheadElement} from './typeahead';

export class User implements ITypeAheadElement {
  id: number;
  email: string;
  name: string;
  modules: Array<{ [name: string]: string[] }>;

  constructor(raw) {
    this.id = raw.id;
    this.email = raw.email;
    this.name = raw.name;
    this.modules = raw.modules;
  }

  get IsAdmin(): boolean {
    return this.modules.hasOwnProperty('partner') || this.modules.hasOwnProperty('service');
  }

  get DisplayValue() {
    return this.name;
  }
}
