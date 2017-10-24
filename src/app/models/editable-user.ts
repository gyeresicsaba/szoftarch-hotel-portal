
export class EditableUser {
  id: number;
  email: string;
  name: string;
  active: boolean;
  occupation: string;

  constructor(raw) {
    this.id = raw.id;
    this.email = raw.email;
    this.name = raw.name;
    this.active = raw.active;
    this.occupation = raw.occupation;
  }

}
