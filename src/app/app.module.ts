import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { NationsComponent } from './nations/nations.component';
import { SeafieldsComponent } from './seafields/seafields.component';
import { UnitsComponent } from './units/units.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    NationsComponent,
    SeafieldsComponent,
    UnitsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
