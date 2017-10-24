import {EditableUser} from './editable-user';
import {Access} from './access';
export class EditableUserDetailsHttp {
  editableUser: EditableUser;
  roles: Array<Access>;

  constructor(editableUser: EditableUser, roles) {
    this.editableUser = editableUser;
    this.roles = roles;
  }
}
