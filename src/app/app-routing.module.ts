import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { WinnerTableComponent } from './components/winner-table/winner-table.component';
import { JacpotslottableComponent } from './components/jacpotslottable/jacpotslottable.component';
import { ClearWinnerTableComponent } from './components/clear-winner-table/clear-winner-table.component'

import { ManageComponent } from './blackjack/components/manage/manage.component';
import { BackstageComponent } from './blackjack/components/backstage/backstage.component';

import { Top5vvsComponent } from './top5/components/top5vvs/top5vvs.component';
import { Top5Component } from './top5/components/top5/top5.component';

const routes: Routes = [

// Jacpots on Slots and Tables
  { path: '', component: JacpotslottableComponent, pathMatch: 'full' },
  { path: 'winners', component: WinnerTableComponent },
  { path: 'clear', component: ClearWinnerTableComponent },

// BlackJack game 
  { path: 'blackjack', component: BackstageComponent },
  { path: 'blackjackmanage', component: ManageComponent },

// Top5
  { path: 'top5', component: Top5Component },
  { path: 'top5vvs', component: Top5vvsComponent },

  //{ path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  //declarations: [ AppComponent, WinnerTableComponent, ClearWinnerTableComponent, JacpotslottableComponent, BackstageComponent, ManageComponent, Top5Component, Top5vvsComponent ],
  bootstrap: [ AppComponent ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
