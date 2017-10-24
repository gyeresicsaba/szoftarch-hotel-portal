/**
 * Created by ekemate on 2017. 03. 16..
 */
import {AnalysisRow} from './analysis-row';

export class AnalysisRowPag extends AnalysisRow {
  barcode: string;
  usage_number: number;
  od: number;
  result: string;

  constructor(raw) {
    super(raw);

    this.barcode = raw.barcode || '';
    this.usage_number = raw.usage_number || null;
    this.od = raw.od || null;
    this.result = raw.result || '';
  }

  get IsValid(): boolean {
    return !!this.barcode;
  }

  get IsValidResults(): boolean {
    return this.IsValid && !!this.od && !!this.result;
  }
}
