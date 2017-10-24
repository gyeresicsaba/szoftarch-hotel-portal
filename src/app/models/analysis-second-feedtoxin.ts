/**
 * Created by ekemate on 2017. 03. 13..
 */
import {AnalysisSecondHeader} from './analysis-second-header';
import {AnalysisRowFeedtoxin} from './analysis-row-feedtoxin';

export class AnalysisSecondFeedtoxin extends AnalysisSecondHeader {
  analysis_types: Array<string>;
  barcode: string;
  forage_type: string;
  material_dry_absolute: number;
  material_dry_average: number;
  material_predry: number;
  sample_taken_by: string;
  sample_type: string;
  unique_identifier: string;
  english: boolean;
  rows: AnalysisRowFeedtoxin[];
  production_controller: string;
  production_controller_id: string;
  sample_taken_place: string;

  constructor(raw) {
    super(raw);

    this.sample_type = raw.sample_type;
    this.barcode = raw.barcode || ('ATH' + new Date().getFullYear().toString().substr(-2) + '0');
    this.analysis_types = raw.analysis_types;
    this.forage_type = raw.forage_type;
    this.material_dry_absolute = raw.material_dry_absolute;
    this.material_dry_average = raw.material_dry_average;
    this.material_predry = raw.material_predry;
    this.sample_taken_by = raw.sample_taken_by;
    this.sample_type = raw.sample_type;
    this.unique_identifier = raw.unique_identifier;
    this.english = raw.english;
    this.sample_taken_place = raw.sample_taken_place;

    this.rows = raw.rows.map(row => new AnalysisRowFeedtoxin(row));
    this.production_controller = raw.production_controller;
  }

  get Saveable(): {
    testable: boolean, sentable: boolean, comment: string,
    dates: { sample_taken_at: string, sample_arrived_at: string },
    sample_type: string, barcode: string, analysis_types: Array<string>, forage_type: string,
    material_dry_absolute: number, material_dry_average: number, material_predry: number,
    sample_taken_by: string, unique_identifier: string,
    production_controller: string, production_controller_id: string, sample_taken_place: string
  } {
    const generic = super.getSaveable();
    return Object.assign({
      sample_type: this.sample_type,
      barcode: this.barcode,
      analysis_types: this.analysis_types,
      forage_type: this.forage_type,
      material_dry_absolute: this.material_dry_absolute,
      material_dry_average: this.material_dry_average,
      material_predry: this.material_predry,
      sample_taken_by: this.sample_taken_by,
      unique_identifier: this.unique_identifier,
      english: this.english,
      production_controller: this.production_controller,
      production_controller_id: this.production_controller_id,
      sample_taken_place: this.sample_taken_place
    }, generic);
  }
}
