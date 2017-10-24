/**
 * Created by csoma on 2017. 03. 20..
 */
import * as moment from 'moment';
export class AnalysisListItem {
  id: number;
  fullIdentifier: string;
  number: number;
  name: string;
  sample_taken_at?: moment.Moment;
  sample_arrived_at?: moment.Moment;
  analysis_created_at?: moment.Moment;
  examined_at?: moment.Moment | false;
  reportUrl: string;
  report_approved_at?: moment.Moment;
  report_sent_at?: moment.Moment | false;
  bill_approved_at?: moment.Moment | false;
  billed_at?: moment.Moment | false;
  nextStep?: string;
  deleted: boolean;

  constructor(raw: any) {
    this.id = raw.id;
    this.fullIdentifier = raw.full_identifier;
    this.number = raw.number;
    this.name = raw.name;
    this.sample_taken_at = moment(raw.sample_taken_at);
    this.reportUrl = raw.report_url;
    this.deleted = raw.deleted;
    const dates = [
      'billed_at',
      'bill_approved_at',
      'report_sent_at',
      'report_approved_at',
      'examined_at',
      'analysis_created_at',
      'sample_arrived_at'
    ];
    for (const date of dates) {
      if (raw[date] === false) {
        this[date] = raw[date];
        this.nextStep = null;
      } else {
        this[date] = moment(raw[date]);
        if (raw[date] === null) {
          this.nextStep = date;
        }
      }
    }
  }

  get SampleArrivedAt(): string {
    return this.sample_arrived_at.isValid() ? this.sample_arrived_at.format('YYYY.MM.DD') : null;
  }

  //noinspection JSUnusedGlobalSymbols
  get SampleTakenAt(): string {
    return this.sample_taken_at.isValid() ? this.sample_taken_at.format('YYYY.MM.DD') : null;
  }

  get AnalysisCreatedAt(): string {
    return this.analysis_created_at.isValid() ? this.analysis_created_at.format('YYYY.MM.DD') : null;
  }

  get ExaminedAt(): string | false {
    if (this.examined_at === false) {
      return false;
    }
    return this.examined_at.isValid() ? this.examined_at.format('YYYY.MM.DD') : null;
  }

  get ReportApprovedAt(): string {
    return this.report_approved_at.isValid() ? this.report_approved_at.format('YYYY.MM.DD') : null;
  }

  get ReportSentAt(): string | false {
    if (this.report_sent_at === false) {
      return false;
    }
    return this.report_sent_at.isValid() ? this.report_sent_at.format('YYYY.MM.DD') : null;
  }

  get BillApprovedAt(): string | false {
    if (this.bill_approved_at === false) {
      return false;
    }
    return this.bill_approved_at.isValid() ? this.bill_approved_at.format('YYYY.MM.DD') : null;
  }

  get BilledAt(): string | false {
    if (this.billed_at === false) {
      return false;
    }
    return this.billed_at.isValid() ? this.billed_at.format('YYYY.MM.DD') : null;
  }
}
