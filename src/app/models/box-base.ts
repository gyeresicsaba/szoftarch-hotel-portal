/**
 * Created by ekemate on 2017. 04. 27..
 */
export class BoxBase {
  partner_name: string;
  partner_number: string;
  pipe_diff: number;
  battery_diff: number;

  constructor(raw) {
    this.partner_name = raw.partner_name;
    this.partner_number = raw.partner_number;
    this.pipe_diff = raw.pipe_diff;
    this.battery_diff = raw.battery_diff;
  }
}
