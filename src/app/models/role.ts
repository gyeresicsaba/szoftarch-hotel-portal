import {Access} from './access';

export class Role extends Access {
  name: string;

  constructor(raw) {
    super(raw);
    this.name = raw.name;
  }
}
