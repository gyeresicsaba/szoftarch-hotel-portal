/**
 * Created by csoma on 2017. 04. 27..
 */
import {DictionaryElement} from './dictionary-element';
export class MastitisType extends DictionaryElement {
  get DisplayValue(): string {
    return this.code;
  }
}
