/**
 * Created by csoma on 2017. 03. 28..
 */
import {AnalysisRowMastitis} from './analysis-row-mastitis';
import {AnalysisSecondHeader} from './analysis-second-header';
export class AnalysisSecondMastitis extends AnalysisSecondHeader {
  rows: Array<AnalysisRowMastitis> = [];
  postage: boolean;
  sample_delivery_method: string;
  analysis_type: string;
  sample_number: number;
  resistance_testing: boolean;

  constructor(raw) {
    super(raw);
    this.rows = raw.rows.map(row => new AnalysisRowMastitis(row));
    this.sample_number = raw.sample_number || null;
    this.postage = raw.postage || false;
    this.sample_delivery_method = raw.sample_delivery_method;
    this.analysis_type = raw.analysis_type;
    this.resistance_testing = raw.resistance_testing || false;
  }

  get Saveable(): {
    testable: boolean, sentable: boolean, comment: string, sample_number: number,
    dates: { sample_arrived_at: string },
    postage: boolean,
    sample_delivery_method: string,
    analysis_type: string,
    resistance_testing: boolean
  } {
    const generic = super.getSaveable();
    return Object.assign({
      analysis_type: this.analysis_type,
      resistance_testing: this.resistance_testing,
      sample_number: this.sample_number,
      postage: this.postage,
      sample_delivery_method: this.sample_delivery_method
    }, generic);
  }
}
