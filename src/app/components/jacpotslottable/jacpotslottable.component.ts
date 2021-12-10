
import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { Observable } from "rxjs";
import { JackpotSlotTable } from '../../models/jackpot-slot-table.model';
import { JackpotService } from '../../services/jackpot.service';
import { timer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, state, style, animate, transition} from '@angular/animations';

@Component({
  selector: 'app-jacpotslottable',
  templateUrl: './jacpotslottable.component.html',
  styleUrls: ['./jacpotslottable.component.css'],
  animations: [
    
    trigger('animationWinner', [
      state('none', style({ opacity: '0', display: 'none'})),
      state('init', style({ transform: 'rotate3d(0, 1, 0, -90deg)', opacity: '1'})),
      state('enter', style({ transform: 'scale(1) rotate3d(0, 1, 0, 0deg)', opacity: '1'})),
      state('leave', style({ transform: 'scale(0)', opacity: '0'})),
      transition('init => enter', animate('0.5s ease-in')),
      transition('enter => leave', animate('0.5s ease-in')),
      transition('leave => init', animate('0s ease-in'))
    ]),
    trigger('animationCatching', [
      state('none', style({ opacity: '0', display: 'none'})),
      state('init', style({ transform: 'scale(0)', opacity: '0'})),
      state('enter', style({ transform: 'scale(1)', opacity: '1'})),
      state('leave', style({ transform: 'rotate3d(0, 1, 0, 90deg)', opacity: '1'})),
      transition('init => enter', animate('0.5s ease-in')),
      transition('enter => leave', animate('0.5s ease-in')),
      transition('leave => init', animate('0s ease-in'))
    ]),
    trigger('animationButtons', [
      state('none', style({ opacity: '0', display: 'none'})),
      state('init', style({ transform: 'scale(0)', opacity: '0'})),
      state('enter', style({ transform: 'scale(1)', opacity: '1'})),
      state('leave', style({ transform: 'scale(0)', opacity: '0'})),
      transition('init => enter', animate('0.5s ease-in')),
      transition('enter => leave', animate('0.5s ease-in')),
      transition('leave => init', animate('0s ease-in'))
    ]) 

 ]
})

export class JacpotslottableComponent implements OnInit {

  /*@HostBinding('@todoAnimation') true;

  @HostBinding('@stateAnimation') get state() {
     return this.todo.completed ? 'complete' : 'incomplete';
  }*/

  stateCatching = 'init';
  stateWinner = 'init';
  stateButtons = 'init';

 labelWinner;
 labelLocation;
  
  title = 'jackpot-slot-table';

  // catchingPreloader: any = {};
  // allSlots: any = {};
  // allTables: any = {};

  catchingPreloader: JackpotSlotTable[] = [];
  allSlots: JackpotSlotTable[] = [];
  allTables: JackpotSlotTable[] = [];

  public CardWinner: boolean = true;
  public Catching: boolean = true;
  public buttonsDisabled: boolean = false;
  public NoPlayers: boolean = true;

  Winner: any = {} as JackpotSlotTable;
  
  // Timer ///////////////////////////////////////////////////////////////////////////////
  timeLeft: number = 185; // 3 minutes +5sec задержка перед запуском
  timerview: number = 180;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if(this.timeLeft < 180) { this.timerview = this.timeLeft; }
      } else {
        this.releaseWinner();
      }
    },1000)
  }

  resetTimer() {
    clearInterval(this.interval);
  }

  releaseWinner() {
    this.timeLeft = 185;
    this.timerview = 180;
    this.resetTimer();
    this.stateWinner = 'leave';
    //this.showButtons();
  }

  ////////////////////////////////////////////////////////////////////////////////////////

    // TimerCatching ///////////////////////////////////////////////////////////////////////////////
    timeLeftCatching: number = 40; 
    intervaCatching;
    RandomLocation;
    public WinnerSelected: boolean = false;
      
    startCatching() {
      this.intervaCatching = setInterval(() => {
        if(this.timeLeftCatching > 0) {
          this.timeLeftCatching--;
          if(this.timeLeftCatching > 10) {
            this.RandomLocation = this.catchingPreloader[Math.floor(Math.random() * this.catchingPreloader.length)].location;
            // console.log(this.RandomLocation);
          } else {
            this.RandomLocation = this.Winner.location;
            this.WinnerSelected = true;
          }
        } else {
          this.releaseCatching();
        }
      },100)
    }
  
    resetCatching() {
      clearInterval(this.intervaCatching);
    }

    releaseCatching() {
      this.timeLeftCatching = 40;
      this.resetCatching();
      //this.showCardWinner()
      this.stateCatching = 'leave';
    }
  
  ////////////////////////////////////////////////////////////////////////////////////////

  constructor(
    private jackpotService: JackpotService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getTables();
    this.getSlots();
    this.showButtons();
  }

  hideAllElements() {
    this.CardWinner = true;
    this.Catching = true;
  }

////////////////////////////////////////////
  showButtons() {
    this.stateButtons = 'enter';
  }

  animButtonsStart(event) { }
      
  animBattonsEnd(event) {
    if(this.stateButtons == 'leave') {
      this.stateButtons = 'init';
      this.stateCatching = 'enter';
    }
  } 

////////////////////////////////////////////
showCatching() {
  this.Catching = false;
  this.stateButtons = 'leave';
  this.stateCatching = 'enter';
  this.startCatching();
}

animCatchingStart(event) { }
      
animCatchingEnd(event) { 
  if(this.stateCatching == 'leave') {
    this.stateCatching = 'init';
    this.WinnerSelected = false;
    this.showCardWinner();
  }
  if(this.stateCatching == 'init') {
    this.Catching = true;
  }
}

////////////////////////////////////////////

  showCardWinner() {
    this.CardWinner = false;
    this.stateWinner = 'enter';
    this.startTimer();
  }
  
  animWinnerStart(event) { }
      
  animWinnerEnd(event) {
    if(this.stateWinner == 'leave') {
      this.stateWinner = 'init';
      this.stateButtons = 'enter';
      this.buttonsDisabled = false;
    }
    if(this.stateWinner == 'init') {
      this.CardWinner = true;
    }
   }

////////////////////////////////////////////

  getSlotWinner() {
    if(this.buttonsDisabled == false){
      this.buttonsDisabled = true;
      this.hideAllElements();
      this.labelWinner = 'Победитель на слот-автоматах';
      this.labelLocation = 'Локация слота:';
      // return this.jackpotService.getJackpotRandomSlot().subscribe((data: {}) => {
      //   this.Winner = data;
      //   if(this.Winner.code != 204) {
      //     //console.log('Slots:');
      //     console.log(this.Winner);
      //     this.catchingPreloader = this.allSlots;
      //     this.showCatching();
      //   } else { 
      //     this.buttonsDisabled = false; 
      //     this.NoPlayers = false;
      //   }
      // })

      this.Winner = {
        "playerId": 11223344,
        "firstName": "ALEKSEI",
        "lastName": "IVANOV",
        "rank": "Green Lantern",
        "location": "MB01",
        "locationType": "Slot"
      };
      console.log(this.Winner);
      this.catchingPreloader = this.allSlots;
      this.showCatching();

    }
  }

  getTableWinner() {
    if(this.buttonsDisabled == false){
      this.buttonsDisabled = true;
      this.hideAllElements();
      this.labelWinner = 'Победитель на столах';
      this.labelLocation = 'Локация стола:';
      // return this.jackpotService.getJackpotRandomTable().subscribe((data: {}) => {
      //   this.Winner = data;
      //   if(this.Winner.code != 204) {
      //      //console.log('Table:');
      //     console.log(this.Winner);
      //     this.catchingPreloader = this.allTables;
      //     this.showCatching();
      //   } else { 
      //     this.buttonsDisabled = false; 
      //     this.NoPlayers = false;
      //   }
      // })

      this.Winner = {
        "playerId": 10203040,
        "firstName": "IVAN",
        "lastName": "POKRISHKIN",
        "rank": "Superman",
        "location": "99887766",
        "locationType": "Table"
      };
      console.log(this.Winner);
      this.catchingPreloader = this.allTables;
      this.showCatching();

    }
  }

  
  getTables() {
    this.hideAllElements();
    // return this.jackpotService.getActiveAllTables().subscribe((data: {}) => {
    //   this.allTables = data
    //   //console.log('Tables' + this.allTables.length);
    //   //.log(this.allTables);
    // })
    this.allTables = [{
      "playerId": 10203040,
      "firstName": "IVAN",
      "lastName": "POKRISHKIN",
      "rank": "Superman",
      "location": "99887766",
      "locationType": "Table"
    },
    {
      "playerId": 11223344,
      "firstName": "ALEKSEI",
      "lastName": "IVANOV",
      "rank": "Green Lantern",
      "location": "MB01",
      "locationType": "Table"
    }];
    console.log(this.allTables);
  }

  getSlots() {
    this.hideAllElements();
    // return this.jackpotService.getActiveAllSlots().subscribe((data: {}) => {
    //   this.allSlots = data;
    //   //console.log('Slots ' + this.allSlots.length);
    //   //console.log(this.allSlots);
    // })
    this.allSlots = [{
      "playerId": 10203040,
      "firstName": "IVAN",
      "lastName": "POKRISHKIN",
      "rank": "Superman",
      "location": "99887766",
      "locationType": "Slot"
    },
    {
      "playerId": 11223344,
      "firstName": "ALEKSEI",
      "lastName": "IVANOV",
      "rank": "Green Lantern",
      "location": "MB01",
      "locationType": "Slot"
    }];
  }


}
