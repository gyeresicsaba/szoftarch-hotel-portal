/**
 * Created by ekemate on 2017. 03. 01..
 */
import {ITypeAheadElement} from './typeahead';


export class ItemNumber implements ITypeAheadElement {
  id: number;
  item_number: string;
  name: string;
  price: number;
  comment?: string;
  feed_toxin: boolean;
  mastitis: boolean;
  milk_toxin: boolean;
  pag: boolean;
  tampon: boolean;

  static copyConstructor(itemNumber: ItemNumber) {
    return new ItemNumber({
      id: itemNumber.id,
      item_number: itemNumber.item_number,
      name: itemNumber.name,
      price: itemNumber.price,
      comment: itemNumber.comment,
      feed_toxin: itemNumber.feed_toxin,
      mastitis: itemNumber.mastitis,
      milk_toxin: itemNumber.milk_toxin,
      pag: itemNumber.pag,
      tampon: itemNumber.tampon,
    });
  }

  constructor(raw) {
    this.id = raw.id;
    this.item_number = raw.item_number;
    this.name = raw.name;
    this.price = raw.price;
    this.comment = raw.comment ? raw.comment : '';
    this.feed_toxin = raw.feed_toxin;
    this.mastitis = raw.mastitis;
    this.milk_toxin = raw.milk_toxin;
    this.pag = raw.pag;
    this.tampon = raw.tampon;
  }

  get DisplayValue(): string {
    return this.item_number + ' - ' + this.name + ' (' + this.price + ' Ft)';
  }

  copy(itemNumber: ItemNumber) {
    this.id = itemNumber.id;
    this.item_number = itemNumber.item_number;
    this.name = itemNumber.name;
    this.price = itemNumber.price;
    this.comment = itemNumber.comment;
    this.feed_toxin = itemNumber.feed_toxin;
    this.mastitis = itemNumber.mastitis;
    this.milk_toxin = itemNumber.milk_toxin;
    this.pag = itemNumber.pag;
    this.tampon = itemNumber.tampon;
  }
}
