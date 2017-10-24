/**
 * Created by csoma on 2017. 04. 11..
 */
import {AnalysisRow} from './analysis-row';
export class AnalysisRowFeedtoxin extends AnalysisRow {
  analysis_type: string;
  result: number;
  result_12: number;
  result_absolute: number;
  result_original: number;
  result_with_limit: number;
  row_id: number;
  toxin_name: string;
  results: Array<{ id: number, result: number, row_id: number, type: string }>;

  constructor(raw) {
    super(raw);
    this.analysis_type = raw.analysis_type;
    this.result = raw.result;
    this.result_12 = raw.result_12;
    this.result_absolute = raw.result_absolute;
    this.result_original = raw.result_original;
    this.result_with_limit = raw.result_with_limit;
    this.row_id = raw.row_id;
    this.toxin_name = raw.toxin_name;
    this.results = raw.results;
    //this.id = raw.id;
  }

  get Saveable() {
    return this;
  }

  get IsValidResults() {
    return !!this.analysis_type && this.result && this.result_12 && this.result_absolute && this.result_original && this.result_with_limit;
  }
}
