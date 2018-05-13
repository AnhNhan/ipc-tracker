import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersistenceModule } from 'angular-persistence';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { NationsComponent } from './nations/nations.component';
import { SeafieldsComponent } from './seafields/seafields.component';
import { UnitsComponent } from './units/units.component';
import { AllegianceNamePipe } from './allegiance-name.pipe';
import { GamescreenComponent } from './gamescreen/gamescreen.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    NationsComponent,
    SeafieldsComponent,
    UnitsComponent,
    AllegianceNamePipe,
    GamescreenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersistenceModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
