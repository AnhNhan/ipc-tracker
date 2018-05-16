import { Injectable } from '@angular/core';
import { nations } from './nations';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NationService {

  constructor() { }

  getNations() {
    return of(nations);
  }
}
