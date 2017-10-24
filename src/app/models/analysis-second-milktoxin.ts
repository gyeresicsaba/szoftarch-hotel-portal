/**
 * Created by ekemate on 2017. 03. 23..
 */
import {AnalysisSecondHeader} from './analysis-second-header';
import {AnalysisRowMilktoxin} from './analysis-row-milktoxin';

export class AnalysisSecondMilktoxin extends AnalysisSecondHeader {
  sample_type: string;
  sample_arrival_temperature: number;
  rows: AnalysisRowMilktoxin[];
  postage: boolean;
  analysis_types: string[];
  box_identifier: number;
  instrument_identifier: number;
  milk_litre: boolean;
  sample_quantity: number;
  sample_number: number;
  registration_number: boolean;
  production_controller: string;
  production_controller_id: string;

  constructor(raw) {
    super(raw);

    this.sample_type = raw.sample_type;
    this.sample_arrival_temperature = raw.sample_arrival_temperature;
    this.rows = raw.rows.map(row => new AnalysisRowMilktoxin(row));
    this.sample_number = raw.sample_number || null;
    this.postage = raw.postage || false;
    this.analysis_types = JSON.parse(raw.analysis_types);
    this.box_identifier = raw.box_identifier;
    this.instrument_identifier = raw.instrument_identifier;
    this.milk_litre = raw.milk_litre || false;
    this.sample_quantity = raw.sample_quantity || 45;
    this.registration_number = raw.registration_number || false;
    this.production_controller = raw.production_controller;
  }

  get Saveable(): {
    testable: boolean, sentable: boolean, comment: string, sample_number: number,
    dates: { sample_taken_at: string, sample_arrived_at: string }, postage: boolean,
    sample_type: string, sample_arrival_temperature: number, analysis_types: string[],
    box_identifier: number,
    instrument_identifier: number,
    milk_litre: boolean,
    sample_quantity: number,
    registration_number: boolean,
    production_controller: string,
    production_controller_id: string
  } {
    const generic = super.getSaveable();
    return Object.assign({
      postage: this.postage,
      sample_type: this.sample_type,
      sample_number: this.sample_number,
      sample_arrival_temperature: this.sample_arrival_temperature,
      analysis_types: this.analysis_types,
      sample_quantity: this.sample_quantity,
      box_identifier: this.box_identifier,
      instrument_identifier: this.instrument_identifier,
      milk_litre: this.milk_litre,
      registration_number: this.registration_number,
      production_controller: this.production_controller,
      production_controller_id: this.production_controller_id,
    }, generic);
  }
}
