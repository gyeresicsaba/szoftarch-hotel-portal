import {Modal} from './modal';

export class ErrorModal extends Modal {
  title: string;
  message: any;
  buttons: Array<{ text: string, classes?: string, callback: Function }>;
  errors: { name: string, errors: string[] }[] = [];

  constructor(title: string, message: any, buttons: Array<{ text: string, classes?: string, callback: Function }>) {
    super(title, message, buttons);
    console.log(this.message.error.errors);
    Object.keys(this.message.error.errors).forEach((key) => {
      this.errors.push({name: this.message.error.errors[key].name, errors: this.message.error.errors[key].message});
    });
  }
}
