/**
 * Created by csoma on 2017. 04. 04..
 */
export class ResistanceTable {
  cells: Array<Array<{ column_id: number, resistance_row_id: number, result: string, result_id: number }>>;
  columns: Array<{ analysis_id: number, antibiotic: string, antibiotic_id: number, id: number }>;
  rows: Array<{
    analysis_id: number, analysis_row_id: number, row_id: number, row_identification_number: number, toxin: string, toxin_id: number
  }>;

  private analysisId: number;

  constructor({cells, columns, rows}, analysisId: number) {
    this.cells = cells;
    this.columns = columns;
    this.rows = rows;
    this.analysisId = analysisId;
  }

  getCellsForRow(rowId: number) {
    return this.cells.filter(r => r.length > 0 && r[0].resistance_row_id === rowId)[0];
  }

  addColumn(cId: number) {
    this.columns.push({analysis_id: this.analysisId, antibiotic: null, antibiotic_id: null, id: cId});
    this.cells.forEach(row => {
      row.push({
        column_id: cId,
        resistance_row_id: row[row.length - 1].resistance_row_id,
        result: null,
        result_id: null
      });
    });
  }

  deleteColumn(col: { analysis_id: number, antibiotic: string, antibiotic_id: number, id: number }) {
    this.columns = this.columns.filter(c => col.id !== c.id);
    this.cells.forEach((row, idx) => {
      this.cells[idx] = row.filter(cell => cell.column_id !== col.id);
    });
  }
}
