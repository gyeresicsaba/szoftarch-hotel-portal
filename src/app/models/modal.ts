/**
 * Created by ekemate on 2017. 03. 06..
 */
export class Modal {
  title: string;
  message: string;
  buttons: Array<{text: string, classes?: string, callback: Function}>;

  constructor(title: string, message: string, buttons: Array<{text: string, classes?: string, callback: Function}>) {
    this.title = title;
    this.message = message;
    this.buttons = buttons;
  }
}
