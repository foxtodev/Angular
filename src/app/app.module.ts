import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WinnerTableComponent } from './components/winner-table/winner-table.component';
import { JacpotslottableComponent } from './components/jacpotslottable/jacpotslottable.component';
import {JackpotService } from './services/jackpot.service';
import { ClearWinnerTableComponent } from './components/clear-winner-table/clear-winner-table.component';
import { ManageComponent } from './blackjack/components/manage/manage.component';
import { BackstageComponent } from './blackjack/components/backstage/backstage.component';

import { SortByPipe} from './pipes/sort-by.pipe';

import { Top5vvsComponent } from './top5/components/top5vvs/top5vvs.component';
import { Top5Component } from './top5/components/top5/top5.component';

@NgModule({
  declarations: [
    AppComponent,
    WinnerTableComponent,
    JacpotslottableComponent,
    ClearWinnerTableComponent,
    ManageComponent,
    BackstageComponent,
    SortByPipe,
    Top5vvsComponent,
    Top5Component,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [
    //JackpotService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
