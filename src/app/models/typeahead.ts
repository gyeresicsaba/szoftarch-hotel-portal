export class TypeAhead {
  value: ITypeAheadElement;
  active: boolean;

  constructor(value: ITypeAheadElement) {
    this.value = value;
    this.active = false;
  }
}

export interface ITypeAheadElement {
  name: string;
  DisplayValue: string;
}
