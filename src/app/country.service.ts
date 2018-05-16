import { Injectable } from '@angular/core';
import { Country } from './model';

import { Observable, of } from 'rxjs';
import { PersistenceService, StorageType } from 'angular-persistence';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  countries: Country[] = [];

  constructor(
    private persistence: PersistenceService
  ) {
    this.countries = persistence.get('countries', StorageType.LOCAL) || [];
  }

  saveCountries() {
    const result = this.persistence.set('countries', this.countries, { type: StorageType.LOCAL });
    console.log('Saved countries: ' + result);
  }

  setCountries(countries: Country[]) {
    this.countries = countries;
  }

  getCountries() {
    return of(this.countries);
  }
}
