import * as moment from 'moment';

export class Access {
  id: number;
  type: string;
  module: string;
  display_name: string;
  description: string;
  created_at: moment.Moment;
  updated_at: moment.Moment;

  constructor(raw) {
    this.id = raw.id;
    this.type = raw.type;
    this.module = raw.module;
    this.display_name = raw.display_name;
    this.description = raw.description;
    this.created_at = moment(raw.created_at);
    this.updated_at = moment(raw.updated_at);
  }
}
