import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { NationService } from '../nation.service';
import { Nation, CountryIngame, NationIngame, Country, Column, Neutrality } from '../model';
import { AllegianceNamePipe } from '../allegiance-name.pipe';

import * as _ from 'lodash';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {

  nations: { [id: number]: NationIngame } = {};
  columns: { [name: string]: Column } = {};
  countries: CountryIngame[] = [];

  global_neutrality: Neutrality = 'strict';

  loadCounter = 2;

  constructor(
    private countryService: CountryService,
    private nationService: NationService,
  ) {
  }

  ngOnInit() {
    this.nationService.getNations().subscribe(nations => {
      let _nations = nations.map(nation => new NationIngame(nation));
      _nations.forEach(nation => {
        this.nations[nation.id] = nation;
        this.columns[nation.name] = new Column(nation.name, nation, []);
      });
      this.columns = _.extend(this.columns, {
        'pro-axis': new Column('pro-axis', null, []),
        'pro-allies': new Column('pro-allies', null, []),
        'strict': new Column('strict', null, []),
      });
      this.loadCounter--;
    });
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries.map(country => new CountryIngame(country));
      this.countries.forEach(country => {
        this.columns[AllegianceNamePipe.prototype.transform(country.allegiance)].countries.push(country);
      });
      this.loadCounter--;
    });
  }

  get columnValues()
  {
    return _.values(this.columns);
  }

}
