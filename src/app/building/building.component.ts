import { Component, OnInit, Input } from '@angular/core';
import { Building } from '../model';

import * as _ from 'lodash';

@Component({
  selector: 'app-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {

  @Input()
  building: Building;
  @Input()
  icon: string;
  @Input()
  stages: number[] = [3];

  dialogVisible = false;

  constructor()
  {
  }

  ngOnInit()
  {
  }

  get maxLevel()
  {
    return _.max(this.stages);
  }

  get availableStages()
  {
    return this.stages.filter(stage => stage > this.building.max);
  }

  toggleDialog($event: MouseEvent)
  {
    let target = $event.target;
    if (target instanceof HTMLElement)
    {
      let button = target.closest('button');
      if (button && button.classList.contains('no-close'))
      {
        return;
      }
    }
    this.dialogVisible = !this.dialogVisible;
  }

}
