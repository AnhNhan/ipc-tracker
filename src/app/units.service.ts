import { Injectable } from '@angular/core';
import { Unit } from './model';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

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
      icons: '<i class="fas fa-male"></i>',
    },
    {
      id: 2,
      name: 'Artillery',
      attack: 2,
      defense: 2,
      movement: 1,
      cost: 4,
      category: 'Land',
      icons: '<i class="fas fa-mars-stroke"></i>',
    },
    {
      id: 3,
      name: 'Mechanized Infantry',
      attack: 1,
      defense: 2,
      movement: 2,
      cost: 4,
      category: 'Land',
      icons: '<i class="fas fa-male"></i> <i class="fas fa-taxi"></i>',
    },
    {
      id: 4,
      name: 'Tank',
      attack: 3,
      defense: 3,
      movement: 2,
      cost: 6,
      category: 'Land',
      icons: '<i class="fas fa-car"></i>',
    },
    {
      id: 5,
      name: 'AA gun',
      attack: 0,
      defense: 1,
      movement: 1,
      cost: 6,
      category: 'Land',
      icons: '<i class="fas fa-plane"></i> <i class="fas fa-crosshairs"></i>',
    },
    {
      id: 6,
      name: 'Fighter',
      attack: 3,
      defense: 4,
      movement: 4,
      cost: 10,
      category: 'Air',
      icons: '<i class="fas fa-fighter-jet"></i>',
    },
    {
      id: 7,
      name: 'Tactical Bomber',
      attack: 3,
      defense: 4,
      movement: 4,
      cost: 11,
      category: 'Air',
      icons: '<i class="fas fa-plane"></i>',
    },
    {
      id: 8,
      name: 'Strategical Bomber',
      attack: 4,
      defense: 1,
      movement: 6,
      cost: 12,
      category: 'Air',
      icons: '<i class="fas fa-plane"></i> <i class="fas fa-expand"></i>',
    },
    {
      id: 9,
      name: 'Submarine',
      attack: 2,
      defense: 1,
      movement: 2,
      cost: 6,
      category: 'Sea',
      icons: '<i class="fas fa-ship"></i> <i class="fas fa-subway"></i>',
    },
    {
      id: 10,
      name: 'Transport',
      attack: 0,
      defense: 0,
      movement: 2,
      cost: 7,
      category: 'Sea',
      icons: '<i class="fas fa-ship"></i> <i class="fas fa-bus"></i>',
    },
    {
      id: 11,
      name: 'Destroyer',
      attack: 2,
      defense: 2,
      movement: 2,
      cost: 8,
      category: 'Sea',
      icons: '<i class="fas fa-ship"></i> <i class="fas fa-broadcast-tower"></i>',
    },
    {
      id: 12,
      name: 'Cruiser',
      attack: 3,
      defense: 3,
      movement: 2,
      cost: 12,
      category: 'Sea',
      icons: '<i class="fas fa-ship"></i> <i class="fas fa-chess-knight"></i>',
    },
    {
      id: 13,
      name: 'Aircraft Carrier',
      attack: 0,
      defense: 2,
      movement: 2,
      cost: 16,
      category: 'Sea',
      icons: '<i class="fas fa-ship"></i> <i class="fas fa-people-carry"></i>',
    },
    {
      id: 14,
      name: 'Battleship',
      attack: 4,
      defense: 4,
      movement: 2,
      cost: 20,
      category: 'Sea',
      icons: '<i class="fas fa-ship"></i> <i class="fas fa-chess-rook"></i>',
    },
  ];

  constructor(
    sanitizer: DomSanitizer,
  ) {
    this.units.forEach(unit => {
      const icons = unit.icons;
      if (typeof icons !== 'string') { return; }
      unit.icons = sanitizer.bypassSecurityTrustHtml(icons);
    });
  }

  getUnits() {
    return of(this.units);
  }
}
