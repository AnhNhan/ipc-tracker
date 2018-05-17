import { Injectable } from '@angular/core';
import { Building, BuildingUnit } from './model';
import { of } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class BuildingsService {

  buildings: BuildingUnit[] = [
    {
      id: 1,
      name: 'Airfield',
      cost: 15,
      icons: '<i class="fas fa-helicopter"></i>',
    },
    {
      id: 2,
      name: 'Seaport',
      cost: 15,
      icons: '<i class="fas fa-anchor"></i>',
    },
    {
      id: 3,
      name: 'Minor Industrial Complex',
      cost: 12,
      icons: '<i class="fas fa-industry"></i>',
    },
    {
      id: 4,
      name: 'Major Industrial Complex',
      cost: 30,
      icons: '<i class="fas fa-industry"></i> <i class="fas fa-expand-arrows-alt"></i>',
    },
    {
      id: 5,
      name: 'Major Industrial Complex Upgrade',
      cost: 20,
      icons: '<i class="fas fa-industry"></i> <i class="fas fa-long-arrow-alt-up"></i>',
    },
  ];

  constructor(
    sanitizer: DomSanitizer,
  ) {
    this.buildings.forEach(building => {
      const icons = building.icons;
      if (typeof icons !== 'string') { return; }
      building.icons = sanitizer.bypassSecurityTrustHtml(icons);
    });
  }

  getBuildings() {
    return of(this.buildings);
  }
}
