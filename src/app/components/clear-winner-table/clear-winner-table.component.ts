import { Component, OnInit } from '@angular/core';

import { JackpotService } from '../../services/jackpot.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clear-winner-table',
  templateUrl: './clear-winner-table.component.html',
  styleUrls: ['./clear-winner-table.component.css']
})
export class ClearWinnerTableComponent implements OnInit {

  constructor(
    private jackpotService: JackpotService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  deleteWinnersTable() {
    return this.jackpotService.WinnersTableDelete().subscribe((data: {}) => {
      //console.log(data);
    })
  }

}