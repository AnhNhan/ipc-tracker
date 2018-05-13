import { Component, OnInit } from '@angular/core';
import { Nation } from '../model';
import { nations } from '../nations';

@Component({
  selector: 'app-nations',
  templateUrl: './nations.component.html',
  styleUrls: ['./nations.component.css']
})
export class NationsComponent implements OnInit {

  nations = nations;

  constructor() { }

  ngOnInit() {
  }

}
