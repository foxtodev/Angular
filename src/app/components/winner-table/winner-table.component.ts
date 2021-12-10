import { Component, OnInit } from '@angular/core';

import { Observable, timer, Subscription } from "rxjs";
import { JackpotSlotTable } from '../../models/jackpot-slot-table.model';
import { WinnersTable } from '../../models/winners-table.model';
import { JackpotService } from '../../services/jackpot.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-winner-table',
  templateUrl: './winner-table.component.html',
  styleUrls: ['./winner-table.component.css']
})
export class WinnerTableComponent implements OnInit {

  interval;

  constructor(
    private jackpotService: JackpotService,
    private route: ActivatedRoute,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getWinners();
    this.interval = setInterval(() => { 
        this.getWinners(); 
    }, 3000);
  }

  WinnersTable: any = [];

  getWinners() {
    return this.jackpotService.getWinnersTable().subscribe((data: {}) => {
      this.WinnersTable = data;
      this.WinnersTable.forEach((element) => {
        element.playerImage = 'data:image/PNG;base64,' + element.playerImage;
      });
      //console.log(this.WinnersTable);
    })
  }

  deleteWinnersTable() {
    return this.jackpotService.WinnersTableDelete().subscribe((data: {}) => {
      //console.log(data);
    })
  }


  
}
