import {ITypeAheadElement} from './typeahead';
/**
 * Created by ekemate on 2017. 03. 08..
 */
export class DictionaryElement implements ITypeAheadElement {
  id: number;
  name: string;
  code: string;
  order?: number;
  comment?: string;
  isDefault?: boolean;

  static copyConstructor(copied: DictionaryElement) {
    const newItem = new DictionaryElement({});
    newItem.copy(copied);
    return newItem;
  }

  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    this.code = raw.code;
    this.order = raw.order ? raw.order : null;
    this.comment = raw.comment ? raw.comment : '';
    this.isDefault = !!raw.default;
  }

  copy(copied: DictionaryElement) {
    this.id = copied.id;
    this.name = copied.name;
    this.code = copied.code;
    this.comment = copied.comment;
    this.order = copied.order;
    this.isDefault = copied.isDefault;
  }

  get Saveable(): {id: number, name: string, code: string, order: number, comment: string, 'default': boolean} {
    return {
      id: this.id,
      name: this.name,
      code: this.code,
      order: this.order,
      comment: this.comment,
      'default': this.isDefault
    };
  }

  get DisplayValue() {
    return this.name;
  }
}
