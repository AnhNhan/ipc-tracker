import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allegianceName'
})
export class AllegianceNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value == 'string')
    {
      return value;
    }
    return value.name;
  }

}
