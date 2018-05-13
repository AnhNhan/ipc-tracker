
export class Entity
{
  id: number;
}

export interface Exportable<T>
{
  export(): T;
}

export class Country extends Entity
{
  name: string;
  ipc: number;
  /// Allegieance at the beginning of the game
  allegiance: Allegiance;
  garrison = 0;

  allegianceCurrent?: Allegiance;
  currentGarrison?: number;

  constructor()
  {
    super();
    this.currentGarrison = this.garrison;
    this.allegianceCurrent = this.allegiance;
  }
}

export class Nation extends Entity
{
  name: string;
  faction: Faction;
}

export class Seafield extends Entity
{
  number: number;
  convoy: boolean = false;
  kamikaze: boolean = false;
}

export type Neutrality = 'strict' | 'pro-axis' | 'pro-allies';
export type Allegiance = Neutrality | Faction;
export type Faction = 'Allies' | 'Axis';

