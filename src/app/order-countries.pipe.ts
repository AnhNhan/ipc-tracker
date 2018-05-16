import { Pipe, PipeTransform } from '@angular/core';
import { Country } from './model';
import * as _ from 'lodash';

@Pipe({
  name: 'orderCountries'
})
export class OrderCountriesPipe implements PipeTransform {

  transform(value: Country[], args?: any): any {
    return _.orderBy(value, [ 'gameRegion', 'name' ]);
  }

}
