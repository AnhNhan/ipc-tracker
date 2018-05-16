
import * as _ from 'lodash';

export class Entity {
  id: number;
}

export class Country extends Entity {
  name: string;
  ipc: number;
  /// Allegieance at the beginning of the game
  allegiance: Allegiance;
  garrison = 0;

  has_airfield: boolean;
  has_seaport: boolean;
  industry_size: 0 | 3 | 10;

  gameRegion: GameRegion;
  theatre: GameHalf;
  hasCapital: boolean;
}

export class CountryIngame extends Country {
  allegianceCurrent?: Allegiance;
  currentGarrison?: number;

  airfield: Building;
  seaport: Building;
  industry: Building;

  constructor(country: Country) {
    super();

    this.id = country.id;
    this.name = country.name;
    this.ipc = country.ipc;
    this.allegiance = country.allegiance;
    this.garrison = country.garrison;

    this.gameRegion = country.gameRegion;
    this.theatre = country.theatre;
    this.hasCapital = country.hasCapital;

    this.airfield = new Building(country.has_airfield ? 3 : 0, 'plane');
    this.seaport = new Building(country.has_seaport ? 3 : 0, 'anchor');
    this.industry = new Building(country.industry_size, 'industry');

    this.currentGarrison = this.garrison;
    this.allegianceCurrent = this.allegiance;
  }

  removeGarrison() {
    this.currentGarrison = 0;
  }
}

export class Nation extends Entity {
  name: string;
  faction: Faction;
  supported_theatres: { [theatre in GameHalf]: boolean };
}

export class NationIngame extends Nation {
  constructor(nation: Nation) {
    super();
    this.id = nation.id;
    this.name = nation.name;
    this.faction = nation.faction;
    this.supported_theatres = nation.supported_theatres;
  }
}

export class Column {
  constructor(
    public name: string,
    public nation: Nation|null,
    public countries: CountryIngame[],
    private bank: Bank,
  ) { }

  get totalIPC() {
    return _.sum(_.map(this.countries, 'ipc'));
  }

  get theatres() {
    const groups = _.groupBy(this.countries, 'theatre');
    return {
      groups,
      keys: Object.keys(groups),
    };
  }

  get account() {
    return this.bank.getAccount(this.nation);
  }
}

function groupByRegion(countries: Country[]) {
  return _.groupBy(countries, 'gameRegion');
}

export class Seafield extends Entity {
  number: number;
  convoy = false;
  kamikaze = false;
}

export type Neutrality = 'strict' | 'pro-axis' | 'pro-allies';
export type Allegiance = Neutrality | Nation;
export type Faction = 'Allies' | 'Axis';
export type GameHalf = 'Europe' | 'Pacific';
export type GameRegion = 'Europe' | 'North America' | 'South America' | 'North Africa' | 'South Africa'
                        | 'West Russia' | 'East Russia / Mongolia' | 'China'
                        | 'West Asia' | 'East Asia' | 'Oceania / Pacific';

export type IncomePhasePosition = 'start' | 'end';

export class Building {
  public current: number;

  constructor(
    public max: number,
    /// coincidentally font awesome icon name
    public type: string,
  ) {
    this.current = max;
  }

  upgrade(num: number) {
    if (this.current !== this.max) {
      console.log('Could not upgrade building');
      return;
    }

    this.current = num;
    this.max = num;
  }

  get maxDamage() {
    return this.max * -2;
  }

  get canBuild() {
    return this.current > 0;
  }

  get isDamaged() {
    return this.current < this.max;
  }

  get canBeDamaged() {
    return this.current > this.maxDamage;
  }

  repair(num: number) {
    this.current = _.min([ this.max, this.current + num ]);
  }

  repairFully() {
    this.current = this.max;
  }

  damage(num: number) {
    this.current = _.max([ this.maxDamage, this.current - num ]);
  }
}

export class Unit extends Entity {
  name: string;
  attack: number;
  defense: number;
  movement: number;
  cost: number;
  category: 'Land' | 'Air' | 'Sea';
}

export class BuildingUnit extends Entity {
  name: string;
  cost: number;
}

export class Bank {
  accounts: {
    [nation_id: number]: {
      balance: number,
      transactions: number[],
      lastGrant: number,
      lastDeduction: number,
      lastRemembered: number,
    }
  } = {};

  getAccount(nation: Nation) {
    if (!this.accounts[nation.id]) {
      this.accounts[nation.id] = {
        balance: 0,
        transactions: [],
        lastDeduction: 0,
        lastGrant: 0,
        lastRemembered: 0,
      };
    }
    return this.accounts[nation.id];
  }

  grant(nation: Nation, amount: number) {
    const account = this.getAccount(nation);
    account.balance += amount;
    // account.transactions.push(amount);
    account.lastGrant = amount;
  }

  deduct(nation: Nation, amount: number) {
    const account = this.getAccount(nation);
    account.balance -= amount;
    // account.transactions.push(-amount);
    account.lastDeduction = amount;
  }

  remember(nation: Nation) {
    const account = this.getAccount(nation);
    account.lastRemembered = account.balance;
  }
}

export class ShoppingList {
  number_units: { [id: number]: number } = {};

  number_buildings: { [id: number]: number } = {};

  constructor(
    private units: Unit[],
    private buildings: BuildingUnit[],
  ) {
    this.resetShoppingList();
  }

  totalIPCs() {
    let total = 0;
    this.units.forEach(unit => total += this.number_units[unit.id] * unit.cost);
    this.buildings.forEach(building => total += this.number_buildings[building.id] * building.cost);
  }

  resetShoppingList() {
    this.units.forEach(unit => this.number_units[unit.id] = 0);
    this.buildings.forEach(building => this.number_buildings[building.id] = 0);
  }
}
