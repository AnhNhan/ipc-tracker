
import * as _ from 'lodash';

export class Entity
{
  id: number;
}

export class Country extends Entity
{
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

export class CountryIngame extends Country
{
  allegianceCurrent?: Allegiance;
  currentGarrison?: number;

  airfield: Building;
  seaport: Building;
  industry: Building;

  constructor(country: Country)
  {
    super();

    this.id = country.id;
    this.name = country.name;
    this.ipc = country.ipc;
    this.allegiance = country.allegiance;
    this.garrison = country.garrison;

    this.airfield = new Building(country.has_airfield ? 3 : 0, 'plane');
    this.seaport = new Building(country.has_seaport ? 3 : 0, 'anchor');
    this.industry = new Building(country.industry_size, 'industry');

    this.currentGarrison = this.garrison;
    this.allegianceCurrent = this.allegiance;
  }

  removeGarrison()
  {
    this.currentGarrison = 0;
  }
}

export class Nation extends Entity
{
  name: string;
  faction: Faction;
}

export class NationIngame extends Nation
{
  constructor(nation: Nation)
  {
    super();
    this.id = nation.id;
    this.name = nation.name;
    this.faction = nation.faction;
  }
}

export class Column
{
  constructor(
    public name: string,
    public nation: Nation|null,
    public countries: CountryIngame[],
  ) { }

  get totalIPC()
  {
    return _.sum(_.map(this.countries, 'ipc'));
  }
}

export class Seafield extends Entity
{
  number: number;
  convoy: boolean = false;
  kamikaze: boolean = false;
}

export type Neutrality = 'strict' | 'pro-axis' | 'pro-allies';
export type Allegiance = Neutrality | Nation;
export type Faction = 'Allies' | 'Axis';
export type GameHalf = 'Europe' | 'Pacific';
export type GameRegion = 'Europe' | 'North America' | 'South Africa' | 'North Africa' | 'South Africa' | 'West Russia' | 'East Russia / Mongolia' | 'China' | 'West Asia' | 'East Asia' | 'Oceania / Pacific';

export class Building
{
  public current: number;

  constructor(
    public max: number,
    /// coincidentally font awesome icon name
    public type: string,
  ) {
    this.current = max;
  }

  upgrade(num: number)
  {
    if (this.current != this.max)
    {
      console.log('Could not upgrade building');
      return;
    }

    this.current = num;
    this.max = num;
  }

  get maxDamage()
  {
    return this.max * -2;
  }

  get canBuild()
  {
    return this.current > 0;
  }

  get isDamaged()
  {
    return this.current < this.max;
  }

  get canBeDamaged()
  {
    return this.current > this.maxDamage;
  }

  repair(num: number)
  {
    this.current = _.min([ this.max, this.current + num ]);
  }

  repairFully()
  {
    this.current = this.max;
  }

  damage(num: number)
  {
    this.current = _.max([ this.maxDamage, this.current - num ]);
  }
}
