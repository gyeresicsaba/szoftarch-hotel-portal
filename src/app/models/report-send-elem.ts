/**
 * Created by ekemate on 2017. 03. 21..
 */
import * as moment from 'moment';

export class ReportSendElem {
  id: number;
  name: string;
  email: string;
  sent_at: moment.Moment;

  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    this.email = raw.email;
    this.sent_at = raw.sent_at ? moment(raw.sent_at, 'YYYY.MM.DD.') : null;
  }
}
