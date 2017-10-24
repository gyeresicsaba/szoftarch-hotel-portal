import * as moment from 'moment';

export class Permission {
  id: number;
  name: string;
  display_name: string;
  description: string;
  created_at: moment.Moment;
  updated_at: moment.Moment;

  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    this.display_name = raw.display_name;
    this.description = raw.description;
    this.created_at = moment(raw.created_at);
    this.updated_at = moment(raw.updated_at);
  }
}
