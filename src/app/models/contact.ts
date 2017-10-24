/**
 * Created by ekemate on 2017. 03. 01..
 */
import {ITypeAheadElement} from './typeahead';

export class Contact implements ITypeAheadElement {
  isDefault: boolean;
  email: string;
  id: number;
  name: string;
  phone: string;

  constructor(raw) {
    this.isDefault = raw.default;
    this.email = raw.email;
    this.id = raw.id;
    this.name = raw.name;
    this.phone = raw.phone;
  }

  copy(contact: Contact) {
    this.isDefault = contact.isDefault;
    this.email = contact.email;
    this.id = contact.id;
    this.name = contact.name;
    this.phone = contact.phone;
  }

  get Saveable(): { name: string, email: string, phone: string, 'default': boolean } {
    return {
      name: this.name,
      email: this.email,
      phone: this.phone,
      'default': this.isDefault || false
    };
  }

  get DisplayValue(): string {
    return this.name;
  }
}
