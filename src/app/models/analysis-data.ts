/**
 * Created by ekemate on 2017. 03. 13..
 */
export class AnalysisData {
  id: number;
  full_identifier: string;
  arrival_closed: boolean;
  report_approved: boolean;
  report_saved: boolean;
  report_generated: boolean;
  report_sent: boolean;
  billed: boolean;
  central: boolean;
  deleted: boolean;

  constructor(raw) {
    this.id = raw.id;
    this.full_identifier = raw.full_identifier;
    this.arrival_closed = raw.arrival_closed;
    this.report_approved = raw.report_approved;
    this.billed = raw.billed;
    this.report_saved = raw.report_saved;
    this.report_generated = raw.report_generated;
    this.report_sent = raw.report_sent;
    this.central = raw.central;
    this.deleted = raw.deleted;
  }
}
