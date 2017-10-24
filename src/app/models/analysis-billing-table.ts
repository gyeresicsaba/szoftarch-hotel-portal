import {AnalysisBillingRow} from './analysis-billing-row';
/**
 * Created by csoma on 2017. 03. 22..
 */
export class AnalysisBillingTable {
  payer: { name: string, number: string };
  rows: Array<AnalysisBillingRow>;

  constructor({payer, rows}) {
    this.payer = payer;
    this.rows = rows.data.map(row => new AnalysisBillingRow(row));
  }
}
