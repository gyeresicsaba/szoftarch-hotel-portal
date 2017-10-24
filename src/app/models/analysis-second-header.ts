/**
 * Created by ekemate on 2017. 03. 14..
 */
import * as moment from 'moment';

export class AnalysisSecondHeader {
  customer: {
    name: string;
    number: string;
  };
  testable: boolean;
  sentable: boolean;
  comment: string;
  dates: {
    analysis_created_at: moment.Moment,
    billed_at: moment.Moment,
    examined_at: moment.Moment,
    report_approved_at: moment.Moment,
    report_sent_at: moment.Moment,
    sample_arrived_at: moment.Moment,
    sample_taken_at: moment.Moment,
    examine_made_at: moment.Moment
  };
  pre_billed: boolean;

  constructor(raw) {
    this.customer = {
      name: raw.customer.name ? raw.customer.name : '',
      number: raw.customer.number ? raw.customer.number : ''
    };
    this.testable = raw.testable || false;
    this.sentable = raw.sentable || false;
    this.pre_billed = raw.pre_billed || false;
    this.comment = raw.comment || '';
    this.dates = {
      sample_taken_at: raw.dates.sample_taken_at ? moment(raw.dates.sample_taken_at, 'YYYY.MM.DD.') : moment(null),
      sample_arrived_at: raw.dates.sample_arrived_at ? moment(raw.dates.sample_arrived_at, 'YYYY.MM.DD.') : moment(null),
      analysis_created_at: raw.dates.analysis_created_at ? moment(raw.dates.analysis_created_at, 'YYYY.MM.DD.') : moment(),
      billed_at: raw.dates.billed_at ? moment(raw.dates.billed_at, 'YYYY.MM.DD.') : null,
      examined_at: raw.dates.examined_at ? moment(raw.dates.examined_at, 'YYYY.MM.DD.') : null,
      report_approved_at: raw.dates.report_approved_at ? moment(raw.dates.report_approved_at, 'YYYY.MM.DD.') : null,
      report_sent_at: raw.dates.report_sent_at ? moment(raw.dates.report_sent_at, 'YYYY.MM.DD.') : null,
      examine_made_at: raw.dates.examine_made_at ? moment(raw.dates.examine_made_at, 'YYYY.MM.DD.') : moment(),
    };
  }

  get FormattedSampleTakenAt(): string {
    return this.dates.sample_taken_at.isValid() ? this.dates.sample_taken_at.format('YYYY.MM.DD') : null;
  }

  get FormattedSampleArrivedAt(): string {
    return this.dates.sample_arrived_at.isValid() ? this.dates.sample_arrived_at.format('YYYY.MM.DD') : null;
  }

  get FormattedExamineMadeAt(): string {
    return this.dates.examine_made_at.isValid() ? this.dates.examine_made_at.format('YYYY.MM.DD') : null;
  }

  protected getSaveable(): {
    testable: boolean, sentable: boolean, comment: string,
    dates: { sample_taken_at: string, sample_arrived_at: string, examine_made_at: string }, pre_billed: boolean
  } {
    return {
      testable: this.testable,
      sentable: this.sentable,
      comment: this.comment,
      dates: {
        sample_taken_at: this.FormattedSampleTakenAt,
        sample_arrived_at: this.FormattedSampleArrivedAt,
        examine_made_at: this.FormattedExamineMadeAt
      },
      pre_billed: this.pre_billed
    };
  }
}
