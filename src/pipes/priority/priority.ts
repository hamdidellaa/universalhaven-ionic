import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PriorityPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'priority',
})
export class PriorityPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let pr=  value.toLowerCase();
    if (pr=="low"){
      return "secondary";
    }
    if (pr=="medium"){
      return "light";
    }
    return "danger";
  }
}
