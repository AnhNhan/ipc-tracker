import { Component, OnInit } from '@angular/core';
import { CountryService } from '../country.service';
import { NationService } from '../nation.service';
import { Nation, CountryIngame, NationIngame, Country,
  Column, Neutrality, GameHalf, Bank, IncomePhasePosition, ShoppingList, BuildingUnit, Unit } from '../model';
import { AllegianceNamePipe } from '../allegiance-name.pipe';

import * as _ from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UnitsService } from '../units.service';
import { BuildingsService } from '../buildings.service';

@Component({
  selector: 'app-gamescreen',
  templateUrl: './gamescreen.component.html',
  styleUrls: ['./gamescreen.component.css']
})
export class GamescreenComponent implements OnInit {

  nations: { [id: number]: NationIngame } = {};
  columns: { [name: string]: Column } = {};
  countries: CountryIngame[] = [];
  buildings: BuildingUnit[];
  units: Unit[];

  global_neutrality: Neutrality = 'strict';

  loadCounter = 4;

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

  shoppingList: ShoppingList;

  constructor(
    private route: ActivatedRoute,
    private countryService: CountryService,
    private nationService: NationService,
    private unitsService: UnitsService,
    private buildingsService: BuildingsService,
    private location: Location,
  ) {
  }

  ngOnInit() {
    const _theatreParam = this.route.snapshot.paramMap.get('theatre');
    let theatreParam: GameHalf | 'Global';
    if (_theatreParam && !(
      _theatreParam !== 'Europe'
      && _theatreParam !== 'Pacific'
      && _theatreParam !== 'Global'
    )) {
      theatreParam = _theatreParam;
    } else if (_theatreParam) {
      throw new Error('invalid theatre');
    }
    this.selectedTheatre = theatreParam || 'Global';
    if (this.selectedTheatre === 'Europe') {
      this.enabledTheatres.Pacific = false;
    } else if (this.selectedTheatre === 'Pacific') {
      this.enabledTheatres.Europe = false;
    }

    this.nationService.getNations().subscribe(nations => {
      this.originalNationCount = nations.length;
      const _nations = nations.filter(nation =>
        this.selectedTheatre === 'Global' ||
        nation.supported_theatres[this.selectedTheatre]
      ).map(nation => new NationIngame(nation));
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
      this.decreaseLoadCounter();
    });
    this.countryService.getCountries().subscribe(countries => {
      this.countries = countries.filter(country => this.enabledTheatres[country.theatre]).map(country => new CountryIngame(country));
      this.decreaseLoadCounter();
    });
    this.buildingsService.getBuildings().subscribe(buildings => {
      this.buildings = buildings;
      this.decreaseLoadCounter();
    });
    this.unitsService.getUnits().subscribe(units => {
      this.units = units;
      this.decreaseLoadCounter();
    });
  }

  finishedLoading() {
    this.countries.forEach(country => {
      const column = this.columns[AllegianceNamePipe.prototype.transform(country.allegiance)];
      if (!column) {
        return;
      }
      column.countries.push(country);
    });

    this.shoppingList = new ShoppingList(this.units, this.buildings);

    // if income phase at the end, alreaday "play" a round so we have balance to spend
    // tslint:disable-next-line:no-unused-expression
    this.selectedIncomePhaseLocation === 'end' &&
    Object.values(this.columns).filter(column => column.nation)
    .forEach(column => this.bank.grant(column.nation, column.totalIPC));
  }

  decreaseLoadCounter() {
    this.loadCounter--;

    if (this.loadCounter === 0) {
      this.finishedLoading();
    }
  }

  get columnValues() {
    return _.values(this.columns);
  }

  get currentTurnColumn() {
    return this.columns[this.nations[this.nationTurnCounter].name];
  }

  nextTurn() {
    const nationBefore = this.nations[this.nationTurnCounter];

    this.nextTurnCounter();

    const nationAfter = this.nations[this.nationTurnCounter];

    if (this.selectedIncomePhaseLocation === 'end') {
      this.bank.remember(nationBefore);
      this.bank.grant(nationBefore, this.columns[nationBefore.name].totalIPC);
    }
    if (this.selectedIncomePhaseLocation === 'start') {
      this.bank.remember(nationAfter);
      this.bank.grant(nationAfter, this.columns[nationAfter.name].totalIPC);
    }

    this.bank.deduct(nationBefore, this.shoppingList.totalIPCs);

    this.shoppingList.resetShoppingList();
  }

  nextTurnCounter() {
    this.nationTurnCounter++;
    if (this.nationTurnCounter > this.originalNationCount) {
      this.nationTurnCounter = this.firstNationId;
      this.roundCounter++;
    } else if (!this.nations[this.nationTurnCounter]) {
      this.nextTurnCounter();
    }
  }

  simpleDrop($event, to_column_name) {
    const country_id = $event.dragData;
    const country = this.countries.find(_country => _country.id === country_id);
    const old_column = this.columns[AllegianceNamePipe.prototype.transform(country.allegiance)];
    const new_column = this.columns[to_column_name];

    new_column.countries = _.concat(new_column.countries, country);
    old_column.countries = old_column.countries.filter(_country => _country.id !== country_id);
  }

}
