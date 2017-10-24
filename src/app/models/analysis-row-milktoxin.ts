/**
 * Created by ekemate on 2017. 03. 16..
 */
import {AnalysisRow} from './analysis-row';

export class AnalysisRowMilktoxin extends AnalysisRow {
  barcode: string;
  identification_number: string;
  milk_litre: number;
  registration_number: string;
  result_am1: number | '-';
  result_car: number | '-';
  result_f: number | '-';
  result_l: number | '-';
  result_p: number | '-';
  result_scc: number | '-';
  result_snf: number | '-';
  supplier: string;

  constructor(raw) {
    super(raw);

    this.barcode = raw.barcode || '';
    this.identification_number = raw.identification_number || '';
    this.milk_litre = raw.milk_litre || null;
    this.registration_number = raw.registration_number || null;
    this.result_am1 = raw.result_am1 || null;
    this.result_car = raw.result_car || null;
    this.result_f = raw.result_f || null;
    this.result_l = raw.result_l || null;
    this.result_p = raw.result_p || null;
    this.result_scc = raw.result_scc || null;
    this.result_snf = raw.result_snf || null;
    this.supplier = raw.supplier || null;
  }

  get IsValidResults(): boolean {
    return (
        (this.result_am1 !== null && this.result_am1 !== '')
        || (this.result_car !== null && this.result_car !== '' && (!isNaN(Number(this.result_car)) || this.result_car === '-'))
        || (this.result_f !== null && this.result_f !== '' && (!isNaN(Number(this.result_f)) || this.result_f === '-'))
        || (this.result_l !== null && this.result_l !== '' && (!isNaN(Number(this.result_l)) || this.result_l === '-'))
        || (this.result_p !== null && this.result_p !== '' && (!isNaN(Number(this.result_p)) || this.result_p === '-'))
        || (this.result_scc !== null && this.result_scc !== '' && (!isNaN(Number(this.result_scc)) || this.result_scc === '-'))
        || (this.result_snf !== null && this.result_snf !== '' && (!isNaN(Number(this.result_snf)) || this.result_snf === '-'))
      )
      && (
        (!isNaN(Number(this.result_car)) || this.result_car === '-')
        && (!isNaN(Number(this.result_f)) || this.result_f === '-')
        && (!isNaN(Number(this.result_l)) || this.result_l === '-')
        && (!isNaN(Number(this.result_p)) || this.result_p === '-')
        && (!isNaN(Number(this.result_scc)) || this.result_scc === '-')
        && (!isNaN(Number(this.result_snf)) || this.result_snf === '-')
      );
  }

  get Saveable() {
    return {
      id: this.id,
      comment: this.comment,
      barcode: this.barcode,
      identification_number: this.identification_number,
      milk_litre: this.milk_litre,
      registration_number: this.registration_number,
      result_am1: this.result_am1 ? this.result_am1.toString() : '',
      result_car: this.result_car ? this.result_car.toString() : '',
      result_f: this.result_f ? this.result_f.toString() : '',
      result_l: this.result_l ? this.result_l.toString() : '',
      result_p: this.result_p ? this.result_p.toString() : '',
      result_scc: this.result_scc ? this.result_scc.toString() : '',
      result_snf: this.result_snf ? this.result_snf.toString() : '',
      supplier: this.supplier,
    };
  }
}
