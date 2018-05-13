import { Component, OnInit, Optional } from '@angular/core';
import { Country, Nation } from '../model';
import { nations as NATIONS } from '../nations';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  selectedCountry?: Country;

  lastId = 0;

  public countries: Country[] = [];
  public nations: Nation[] = NATIONS;

  constructor(
  ) {
    this.lastId = Math.max.apply(Math, this.countries.map(function (o) { return o.id; }));
  }

  ngOnInit() {
  }

  createNewCountry()
  {
    this.selectedCountry = {
      id: ++this.lastId,
      name: 'Name',
      ipc: 1,
      allegiance: 'strict',
      garrison: 0,
    };
    this.countries.push(this.selectedCountry);
  }

  selectCountry(country: Country)
  {
    this.selectedCountry = country;
  }

}
