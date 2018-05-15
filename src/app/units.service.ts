import { Injectable } from '@angular/core';
import { Unit } from './model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnitsService {

  units: Unit[] = [
    {
      id: 1,
      name: 'Infantry',
      attack: 1,
      defense: 2,
      movement: 1,
      cost: 3,
      category: 'Land',
    },
    {
      id: 2,
      name: 'Artillery',
      attack: 2,
      defense: 2,
      movement: 1,
      cost: 4,
      category: 'Land',
    },
    {
      id: 3,
      name: 'Mechanized Infantry',
      attack: 1,
      defense: 2,
      movement: 2,
      cost: 4,
      category: 'Land',
    },
    {
      id: 4,
      name: 'Tank',
      attack: 3,
      defense: 3,
      movement: 2,
      cost: 6,
      category: 'Land',
    },
    {
      id: 5,
      name: 'AA',
      attack: 0,
      defense: 1,
      movement: 1,
      cost: 6,
      category: 'Land',
    },
    {
      id: 6,
      name: 'Fighter',
      attack: 3,
      defense: 4,
      movement: 4,
      cost: 10,
      category: 'Air',
    },
    {
      id: 7,
      name: 'Tactical Bomber',
      attack: 3,
      defense: 4,
      movement: 4,
      cost: 11,
      category: 'Air',
    },
    {
      id: 8,
      name: 'Strategical Bomber',
      attack: 4,
      defense: 1,
      movement: 6,
      cost: 12,
      category: 'Air',
    },
    {
      id: 9,
      name: 'Submarine',
      attack: 2,
      defense: 1,
      movement: 2,
      cost: 6,
      category: 'Sea',
    },
    {
      id: 10,
      name: 'Transport',
      attack: 0,
      defense: 0,
      movement: 2,
      cost: 7,
      category: 'Sea',
    },
    {
      id: 11,
      name: 'Destroyer',
      attack: 2,
      defense: 2,
      movement: 2,
      cost: 8,
      category: 'Sea',
    },
    {
      id: 12,
      name: 'Cruiser',
      attack: 3,
      defense: 3,
      movement: 2,
      cost: 12,
      category: 'Sea',
    },
    {
      id: 13,
      name: 'Aircraft Carrier',
      attack: 0,
      defense: 2,
      movement: 2,
      cost: 16,
      category: 'Sea',
    },
    {
      id: 14,
      name: 'Battleship',
      attack: 4,
      defense: 4,
      movement: 2,
      cost: 20,
      category: 'Sea',
    },
  ];

  constructor() { }

  getUnits() {
    return of(this.units);
  }
}
