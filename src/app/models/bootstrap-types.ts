
type BootstrapString = 'success' | 'warning' | 'info' | 'error';
export class BootstrapTypes {
  public static success = new BootstrapTypes('success');
  public static warning = new BootstrapTypes('warning');
  public static info = new BootstrapTypes('info');
  public static error = new BootstrapTypes('error');

  constructor(public value: BootstrapString) {
  }

  toString() {
    return this.value;
  }
}
