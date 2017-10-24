/**
 * Created by ekemate on 2017. 03. 13..
 */
import {AnalysisSecondHeader} from './analysis-second-header';
import {AnalysisRowPag} from './analysis-row-pag';

export class AnalysisSecondPag extends AnalysisSecondHeader {
  sample_type: string;
  barcode: boolean;
  rows: AnalysisRowPag[];
  sample_number: number;
  central: boolean;
  postage: boolean;
  production_controller: string;
  production_controller_id: string;

  constructor(raw) {
    super(raw);

    this.sample_type = raw.sample_type;
    this.barcode = raw.barcode || false;

    this.rows = raw.rows.map(row => new AnalysisRowPag(row));
    this.central = raw.central || false;
    this.postage = raw.postage || false;
    this.sample_number = raw.sample_number || null;
    this.production_controller = raw.production_controller;
  }

  get Saveable(): {
    testable: boolean, sentable: boolean, comment: string, sample_number: number,
    dates: { sample_taken_at: string, sample_arrived_at: string }, central: boolean,
    sample_type: string, barcode: boolean, postage: boolean, production_controller: string,
    production_controller_id: string
  } {
    const generic = super.getSaveable();
    return Object.assign({
      sample_type: this.sample_type,
      barcode: this.barcode,
      central: this.central,
      sample_number: this.sample_number,
      postage: this.postage,
      production_controller: this.production_controller,
      production_controller_id: this.production_controller_id,
    }, generic);
  }
}
