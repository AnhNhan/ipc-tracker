import { Component, OnInit, Input } from '@angular/core';
import { ShoppingList } from '../model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  @Input()
  shoppingList: ShoppingList;

  constructor() { }

  ngOnInit() {
    console.log(this.shoppingList);
  }

}
