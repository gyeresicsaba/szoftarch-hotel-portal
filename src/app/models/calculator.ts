/**
 * Created by csoma on 2017. 04. 12..
 */
export class Calculator {
  vialEmpty1?: number = null;
  vialEmpty2?: number = null;
  vialMoist1?: number = null;
  vialMoist2?: number = null;
  vialDry1?: number = null;
  vialDry2?: number = null;

  preDry?: number;

  type: string;

  private avg: number;

  constructor(preDry, type: string, preSavedRaw?: {
    data: {
      vial_empty_1: number,
      vial_empty_2: number,
      vial_moist_1: number,
      vial_moist_2: number,
      vial_dry_1: number,
      vial_dry_2: number
    }
  }) {
    if (preSavedRaw) {
      this.vialEmpty1 = preSavedRaw.data.vial_empty_1;
      this.vialEmpty2 = preSavedRaw.data.vial_empty_2;
      this.vialMoist1 = preSavedRaw.data.vial_moist_1;
      this.vialMoist2 = preSavedRaw.data.vial_moist_2;
      this.vialDry2 = preSavedRaw.data.vial_dry_1;
      this.vialDry1 = preSavedRaw.data.vial_dry_2;
    }
    this.preDry = preDry;
    this.type = type;
  }

  get Dry1(): number {
    return this.round(((this.vialDry1 - this.vialEmpty1) / (this.vialMoist1 - this.vialEmpty1)) * 100, 2);
  }

  get Dry2(): number {
    return this.round(((this.vialDry2 - this.vialEmpty2) / (this.vialMoist2 - this.vialEmpty2)) * 100, 2);
  }

  get Avg(): number {
    return this.avg ? this.avg : this.round((this.Dry1 + this.Dry2) / 2, 2);
  }

  get Diff(): number {
    return this.round(this.Dry1 - this.Dry2, 2);
  }

  get AbsDiff(): number {
    return Math.abs(this.round(this.Dry1 - this.Dry2, 2));
  }

  get Abs(): number {
    return this.type === 'Nedves' ? (this.preDry * this.Avg / 100) : (this.Avg * 10);
  }

  set Avg(avg: number) {
    this.avg = avg;
  }

  get Savable(): {
    vial_empty_1: number,
    vial_empty_2: number,
    vial_moist_1: number,
    vial_moist_2: number,
    vial_dry_1: number,
    vial_dry_2: number
  } {
    return {
      vial_empty_1: this.vialEmpty1,
      vial_empty_2: this.vialEmpty2,
      vial_moist_1: this.vialMoist1,
      vial_moist_2: this.vialMoist2,
      vial_dry_1: this.vialDry2,
      vial_dry_2: this.vialDry1
    };
  }

  private round(number, precision) {
    const factor = Math.pow(10, precision);
    const tempNumber = number * factor;
    const roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }
}
