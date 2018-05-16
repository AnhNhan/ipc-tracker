import { Injectable } from '@angular/core';
import { Building, BuildingUnit } from './model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  buildings: BuildingUnit[] = [
    {
      id: 1,
      name: 'Airfield',
      cost: 15,
    },
    {
      id: 2,
      name: 'Seaport',
      cost: 15,
    },
    {
      id: 3,
      name: 'Minor Industrial Complex',
      cost: 12,
    },
    {
      id: 4,
      name: 'Major Industrial Complex',
      cost: 30,
    },
    {
      id: 5,
      name: 'Major Industrial Complex Upgrade',
      cost: 20,
    },
  ];

  constructor() { }

  getBuildings() {
    return of(this.buildings);
  }
}
