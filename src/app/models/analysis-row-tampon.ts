/**
 * Created by csoma on 2017. 03. 24..
 */
import {AnalysisRow} from './analysis-row';
import * as moment from 'moment';
import {PickedDate} from './picked-date';
export class AnalysisRowTampon extends AnalysisRow {
  analysis_id: number;
  sample_taken_place?: string;
  result?: string[];
  sample_taken_at?: moment.Moment;
  sampleTakenAtModel: { date: PickedDate };
  result_saprophytes: string;
  result_staph: string;
  result_coliforms: string;
  result_e_coli: string;

  constructor(raw) {
    super(raw);

    this.sample_taken_place = raw.sample_taken_place || '';
    this.sample_taken_at = moment(raw.sample_taken_at);
    this.analysis_id = raw.analysis_id;
    this.result = raw.result || [];
    this.sampleTakenAtModel = this.sample_taken_at.isValid() ? {date: new PickedDate(this.sample_taken_at)} : {date: null};
    this.result_saprophytes = raw.result_saprophytes;
    this.result_staph = raw.result_staph;
    this.result_coliforms = raw.result_coliforms;
    this.result_e_coli = raw.result_e_coli;
  }

  get IsValid(): boolean {
    return !!this.sample_taken_place && this.sample_taken_at !== null && this.sample_taken_at.isValid();
  }

  get IsValidResults(): boolean {
    return this.IsValid && !!this.result_saprophytes && !!this.result_staph && !!this.result_coliforms && !!this.result_e_coli;
  }

  get Savable() {
    return {
      id: this.id, comment: this.comment, analysis_id: this.analysis_id, sample_taken_place: this.sample_taken_place,
      sample_taken_at: this.sample_taken_at.isValid() ? this.sample_taken_at.format('YYYY-MM-DD') : '',
      result_saprophytes: this.result_saprophytes,
      result_staph: this.result_staph,
      result_coliforms: this.result_coliforms,
      result_e_coli: this.result_e_coli
    };
  }
}
