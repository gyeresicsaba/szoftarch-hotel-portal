/**
 * Created by ekemate on 2017. 03. 08..
 */
export class Dictionary {
  id: number;
  name: string;
  has_comment: boolean;
  has_default: boolean;

  constructor(raw) {
    this.id = raw.id;
    this.name = raw.name;
    this.has_comment = raw.has_comment;
    this.has_default = raw.has_default;
  }
}
