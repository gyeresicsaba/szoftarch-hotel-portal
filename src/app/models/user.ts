import {ITypeAheadElement} from './typeahead';

export class User implements ITypeAheadElement {
  id: string;
  email: string;
  name: string;
  modules: { [name: string]: string[] };

  constructor(raw) {
    this.id = raw.id;
    this.email = raw.email;
    this.name = raw.name;
    this.modules = raw.modules;
  }

  get IsAdmin(): boolean {
    if (this.modules.room.indexOf('delete') !== -1) {
      return true
    } else {
      return false;
    }
  }

  get DisplayValue() {
    return this.name;
  }
}
