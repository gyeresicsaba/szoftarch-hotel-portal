import {Injectable} from '@angular/core';

@Injectable()
export class SharedVarsService {
  private variables = {};

  constructor() {
  }

  public setVar<T>(key: string, value: T): void {
    this.variables[key] = value;
  }

  public getVar<T>(key: string): T {
    if (!this.variables.hasOwnProperty(key)) {
      return null;
    } else {
      return this.variables[key];
    }
  }
}
