import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PersistenceModule } from 'angular-persistence';
import { DndModule } from 'ng2-dnd';

import { AppComponent } from './app.component';
import { CountriesComponent } from './countries/countries.component';
import { NationsComponent } from './nations/nations.component';
import { SeafieldsComponent } from './seafields/seafields.component';
import { UnitsComponent } from './units/units.component';
import { AllegianceNamePipe } from './allegiance-name.pipe';
import { GamescreenComponent } from './gamescreen/gamescreen.component';
import { AppRoutingModule } from './/app-routing.module';
import { EditorComponent } from './editor/editor.component';
import { BuildingComponent } from './building/building.component';
import { OrderCountriesPipe } from './order-countries.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CountriesComponent,
    NationsComponent,
    SeafieldsComponent,
    UnitsComponent,
    AllegianceNamePipe,
    GamescreenComponent,
    EditorComponent,
    BuildingComponent,
    OrderCountriesPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersistenceModule,
    AppRoutingModule,
    DndModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
