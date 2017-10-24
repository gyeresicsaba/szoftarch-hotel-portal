/**
 * Created by csoma on 2017. 03. 22..
 */
export class AnalysisBillingRow {
  name: string;
  item_number?: string;
  quantity: number;
  unit_price: number;
  row_id: number;

  constructor(raw) {
    this.name = raw.name;
    this.item_number = raw.item_number;
    this.quantity = raw.quantity;
    this.unit_price = raw.unit_price;
    this.row_id = raw.row_id;
  }
}
