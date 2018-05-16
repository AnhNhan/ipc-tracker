import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { NationService } from '../nation.service';
import { Nation, CountryIngame, NationIngame, Country, Column, Neutrality, GameHalf, Bank, IncomePhasePosition } from '../model';
import { AllegianceNamePipe } from '../allegiance-name.pipe';

import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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

  originalNationCount: number;
  firstNationId: number;
  nationTurnCounter = 1;
  roundCounter = 1;

  selectedTheatre: GameHalf | 'Global';
  enabledTheatres: { [theatre in GameHalf]: boolean } = {
    Europe: true,
    Pacific: true,
  };

  bank = new Bank();
  selectedIncomePhaseLocation: IncomePhasePosition = 'end';

  expectedSpending = 0;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private nationService: NationService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    let _theatreParam = this.route.snapshot.paramMap.get('theatre');
    let theatreParam: GameHalf | 'Global';
    if (_theatreParam && !(
      _theatreParam != 'Europe'
      && _theatreParam != 'Pacific'
      && _theatreParam != 'Global'
    )) {
      theatreParam = _theatreParam;
    } else if (_theatreParam) {
      throw 'invalid theatre';
    }
    this.selectedTheatre = theatreParam || 'Global';
    if (this.selectedTheatre == 'Europe') {
      this.enabledTheatres.Pacific = false;
    } else if (this.selectedTheatre == 'Pacific') {
      this.enabledTheatres.Europe = false;
    }

    this.nationService.getNations().subscribe(nations => {
      this.originalNationCount = nations.length;
      let _nations = nations.filter(nation => this.selectedTheatre == 'Global' || nation.supported_theatres[this.selectedTheatre]).map(nation => new NationIngame(nation));
      _nations.forEach(nation => {
        this.nations[nation.id] = nation;
        this.columns[nation.name] = new Column(nation.name, nation, [], this.bank);
      });
      this.columns = _.extend(this.columns, {
        'pro-axis': new Column('pro-axis', null, [], this.bank),
        'pro-allies': new Column('pro-allies', null, [], this.bank),
        'strict': new Column('strict', null, [], this.bank),
      });
      this.nationTurnCounter = this.firstNationId = _.first(_nations).id;
      this.loadCounter--;
    });
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries.filter(country => this.enabledTheatres[country.theatre]).map(country => new CountryIngame(country));
      this.countries.forEach(country => {
        let column = this.columns[AllegianceNamePipe.prototype.transform(country.allegiance)];
        if (!column) {
          return;
        }
        column.countries.push(country);
      });
      this.loadCounter--;
    });

    // if income phase at the end, alreaday "play" a round so we have balance to spend
    this.selectedIncomePhaseLocation == 'end' && Object.values(this.columns).filter(column => column.nation).forEach(column => this.bank.grant(column.nation, column.totalIPC));
  }

  get columnValues()
  {
    return _.values(this.columns);
  }

  get currentTurnColumn()
  {
    return this.columns[this.nations[this.nationTurnCounter].name];
  }

  nextTurn()
  {
    let nationBefore = this.nations[this.nationTurnCounter];

    this.nextTurnCounter();

    let nationAfter = this.nations[this.nationTurnCounter];

    if (this.selectedIncomePhaseLocation == 'end') {
      this.bank.remember(nationBefore);
      this.bank.grant(nationBefore, this.columns[nationBefore.name].totalIPC);
    }
    if (this.selectedIncomePhaseLocation == 'start') {
      this.bank.remember(nationAfter);
      this.bank.grant(nationAfter, this.columns[nationAfter.name].totalIPC);
    }

    this.bank.deduct(nationBefore, this.expectedSpending);

    this.expectedSpending = 0;
  }

  nextTurnCounter()
  {
    this.nationTurnCounter++;
    if (this.nationTurnCounter > this.originalNationCount) {
      this.nationTurnCounter = this.firstNationId;
      this.roundCounter++;
    } else if (!this.nations[this.nationTurnCounter]) {
      this.nextTurnCounter();
    }
  }

  simpleDrop($event, to_column_name)
  {
    let country_id = $event.dragData;
    let country = this.countries.find(country => country.id == country_id);
    let old_column = this.columns[AllegianceNamePipe.prototype.transform(country.allegiance)];
    let new_column = this.columns[to_column_name];

    new_column.countries = _.concat(new_column.countries, country);
    old_column.countries = old_column.countries.filter(country => country.id != country_id);
  }

}
