/**
 * Created by csoma on 2017. 03. 28..
 */
import {AnalysisRow} from './analysis-row';
import * as moment from 'moment';
import {PickedDate} from './picked-date';

export class AnalysisRowMastitis extends AnalysisRow {
  analysis_id: number;
  sample_taken_at?: moment.Moment;
  sampleTakenAtModel: { date: PickedDate };
  barcode: string;
  identification_number: string;
  registration_number: string;
  is_left_front: boolean;
  is_left_rear: boolean;
  is_right_front: boolean;
  is_right_rear: boolean;
  result_left_front: string;
  result_left_rear: string;
  result_right_front: string;
  result_right_rear: string;
  result_pathogens: Array<string>;
  is_resistance: Array<string>;
  comment: string;

  constructor(raw) {
    super(raw);
    this.sample_taken_at = moment(raw.sample_taken_at);
    this.barcode = raw.barcode || '';
    this.identification_number = raw.identification_number || null;
    this.registration_number = raw.registration_number || null;
    this.is_left_front = raw.is_left_front || false;
    this.is_left_rear = raw.is_left_rear || false;
    this.is_right_front = raw.is_right_front || false;
    this.is_right_rear = raw.is_right_rear || false;
    this.result_left_front = raw.result_left_front || null;
    this.result_left_rear = raw.result_left_rear || null;
    this.result_right_front = raw.result_right_front || null;
    this.result_right_rear = raw.result_right_rear || null;
    this.result_pathogens = raw.result_pathogens || [];
    this.is_resistance = raw.is_resistance || [];
    this.analysis_id = raw.analysis_id;
    this.sampleTakenAtModel = this.sample_taken_at.isValid() ? {date: new PickedDate(this.sample_taken_at)} : {date: null};
  }

  get Savable(): any {
    const tmp: any = Object.assign({}, this);
    tmp.sample_taken_at = this.sample_taken_at.isValid() ? moment(this.sample_taken_at).format('YYYY-MM-DD') : null;
    delete tmp.sampleTakenAtModel;
    return tmp;
  }

  get IsValid(): boolean {
    return true;
    // return !!this.barcode || !!this.identification_number || !!this.registration_number;
  }

  get IsValidResults(): boolean {
    return this.IsValid;
    /*return (!this.is_left_front || (this.is_left_front && this.result_left_front && this.result_left_front.length > 0)) &&
      (!this.is_left_rear || (this.is_left_rear && this.result_left_rear && this.result_left_rear.length > 0)) &&
      (!this.is_right_front || (this.is_right_front && this.result_right_front && this.result_right_front.length > 0)) &&
     (!this.is_right_rear || (this.is_right_rear && this.result_right_rear && this.result_right_rear.length > 0));*/
  }
}
