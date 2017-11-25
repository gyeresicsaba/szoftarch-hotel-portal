import * as moment from 'moment';

/**
 * Dátum-választó komponens által használt adatstruktúra
 */
export class PickedDate {
  /**
   * Kiválasztott nap
   */
  day: number;
  /**
   * Kiválasztott hónap
   */
  month: number;
  /**
   * Kiválasztott év
   */
  year: number;

  /**
   * Példány létrehozása
   * @class
   * @param {moment.Moment} momentDate - dátum
   */
  constructor(momentDate?: moment.Moment) {
    if (!momentDate) {
      momentDate = moment();
    }
    this.fromMoment(momentDate);
  }

  /**
   * Dátum módosítása
   * @param {moment.Moment} date - új dátum
   */
  fromMoment(date: moment.Moment) {
    this.day = date.date();
    this.month = date.month() + 1;
    this.year = date.year();
  }

  //noinspection JSUnusedGlobalSymbols
  /**
   * Visszaadja, hogy a megadott érték egyezik-e a jelenlegivel
   * @param {PickedDate} date - vizsgálandó érték
   * @returns {boolean} - Egyezés
   */
  isEqual(date: PickedDate) {
    return this.day === date.day && this.month === date.month && this.year === date.year;
  }
}
