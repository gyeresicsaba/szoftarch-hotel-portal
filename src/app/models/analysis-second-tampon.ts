/**
 * Created by csoma on 2017. 03. 24..
 */
import {AnalysisSecondHeader} from './analysis-second-header';
import {AnalysisRowTampon} from './analysis-row-tampon';

export class AnalysisSecondTampon extends AnalysisSecondHeader {
  sample_type: string;
  rows: AnalysisRowTampon[];
  postage: boolean;
  sample_number: number;
  sample_delivery_method: string;

  constructor(raw) {
    super(raw);

    this.sample_type = raw.sample_type;
    this.sample_number = raw.sample_number || null;

    this.rows = raw.rows.map(row => new AnalysisRowTampon(row));
    this.postage = raw.postage || false;
    this.sample_delivery_method = raw.sample_delivery_method;
  }

  get Saveable(): {
    testable: boolean, sentable: boolean, comment: string, sample_number: number,
    dates: { sample_arrived_at: string },
    sample_type: string, postage: boolean,
    sample_delivery_method: string
  } {
    const generic = super.getSaveable();
    return Object.assign({
      sample_type: this.sample_type,
      sample_number: this.sample_number,
      postage: this.postage,
      sample_delivery_method: this.sample_delivery_method
    }, generic);
  }
}
