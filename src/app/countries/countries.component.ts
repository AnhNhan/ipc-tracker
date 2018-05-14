import { Component, OnInit, Optional } from '@angular/core';
import { Country, Nation, GameRegion, GameHalf } from '../model';
import { nations as NATIONS } from '../nations';
import { CountryService } from '../country.service';
import { NationService } from '../nation.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})
export class CountriesComponent implements OnInit {

  selectedCountry?: Country;

  lastId = 0;

  public countries: Country[];
  public nations: Nation[];

  constructor(
    private countryService: CountryService,
    private nationService: NationService,
  ) {
  }

  ngOnInit() {
    this.getCountries();
    this.getNations();
  }

  getCountries() {
    this.countryService.getCountries().subscribe((countries => {
      this.countries = countries;
      if (this.countries.length) {
        this.lastId = Math.max.apply(Math, this.countries.map(function (o) { return o.id; }));
      }
    }));
  }

  getNations() {
    this.nationService.getNations().subscribe(nations => this.nations = nations);
  }

  createNewCountry()
  {
    this.selectedCountry = {
      id: ++this.lastId,
      name: 'Name',
      ipc: 1,
      allegiance: 'strict',
      garrison: 0,
      has_airfield: false,
      has_seaport: false,
      industry_size: 0,
      gameRegion: 'Europe',
      theatre: 'Europe',
      hasCapital: false,
    };
    this.countries.push(this.selectedCountry);
    this.countryService.saveCountries();
  }

  selectCountry(country: Country)
  {
    this.selectedCountry = country;
    this.countryService.saveCountries();
  }

  unselectCountry()
  {
    this.selectedCountry = null;
  }

  selectedIPCPlus()
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.ipc++;
    }
  }

  selectedIPCMinus()
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.ipc--;
    }
  }

  setIPC(ipc: number)
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.ipc = ipc;
    }
  }

  setGarrison(garrison: number)
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.garrison = garrison;
    }
  }

  setAllegiance(allegiance: string)
  {
    if (!this.selectedCountry)
    {
      return;
    }

    if (allegiance == 'strict' || allegiance == 'pro-axis' || allegiance == 'pro-allies') {
      this.selectedCountry.allegiance = allegiance;
      return;
    }
    let nation = this.nations.find(nation => nation.name == allegiance);
    if (!nation) {
      throw 'nation not found';
    }
    this.selectedCountry.allegiance = nation;
  }

  setIndustry(num: 0 | 3 | 10)
  {
    if (!this.selectedCountry)
    {
      return;
    }

    this.selectedCountry.industry_size = num;
  }

  setAirfield(val: boolean)
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.has_airfield = val;
      console.log(this.selectedCountry.has_airfield);
    }
  }

  setSeaport(val: boolean)
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.has_seaport = val;
    }
  }

  setRegion(val: GameRegion)
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.gameRegion = val;
    }
  }

  setTheatre(val: GameHalf)
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.theatre = val;
    }
  }

  setCapital(val: boolean)
  {
    if (this.selectedCountry)
    {
      this.selectedCountry.hasCapital = val;
    }
  }

}
