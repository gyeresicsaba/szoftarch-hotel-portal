import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../models/user';

@Pipe({
  name: 'canAccess'
})
export class CanAccessPipe implements PipeTransform {

  transform(modules: { path: string }[], user: User): any {
    return modules.filter(module => user.modules.hasOwnProperty(module.path));
  }

}
