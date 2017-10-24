/**
 * Created by ekemate on 2017. 03. 13..
 */
export class AnalysisFirst {
  customerId: number;
  customerContactId: number;
  resultId: number;
  resultEmailIds: number[];
  payerId: number;

  constructor(raw) {
    this.customerId = raw.customerId;
    this.customerContactId = raw.customerContactId;
    this.resultId = raw.resultId;
    this.resultEmailIds = raw.resultEmailIds;
    this.payerId = raw.payerId;
  }
}
