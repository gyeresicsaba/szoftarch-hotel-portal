/**
 * Created by ekemate on 2017. 03. 16..
 */
export class AnalysisRow {
  id: number;
  comment: string;

  constructor(raw) {
    this.id = raw.row_id;
    this.comment = raw.comment || '';
  }

}
