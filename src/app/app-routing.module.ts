import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GamescreenComponent } from './gamescreen/gamescreen.component';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: 'game', component: GamescreenComponent },
  { path: 'editor', component: EditorComponent },
  { path: '', redirectTo: '/editor', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
