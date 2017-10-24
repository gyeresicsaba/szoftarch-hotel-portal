import {Pipe, PipeTransform} from '@angular/core';
import {Toast} from '../models/toast';

@Pipe({
  name: 'toastFilter',
  pure: false
})
export class ToastFilterPipe implements PipeTransform {

  transform(value: Toast[], args?: any): Toast[] {
    return value.filter(toast => toast.visible).reverse();
  }

}
