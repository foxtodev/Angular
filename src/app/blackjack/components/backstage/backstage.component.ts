import { Component, OnInit } from '@angular/core';
import { DataexchangeService } from '../../services/dataexchange.service';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger, animateChild } from '@angular/animations';

export const cardAnimation = trigger('cardAnimation', [
  transition(':enter', [
    style({ transform: 'scale(0)', opacity: 0, width: '0px', margin: '0px' }),         //initial
    animate('1000ms cubic-bezier(.8, -0.6, 0.2, 1.5)', 
    style({                                               //final
      transform: 'scale(1)', opacity: 1, 
      width: '*', margin: '*'
    }))
  ]
  ),
  transition(':leave',
    [
      style({ transform: 'scale(1)', opacity: 1, width: '*', margin: '*' }), 
      animate('1000ms cubic-bezier(.8, -0.6, 0.2, 1.5)', 
      style({
         transform: 'scale(0)', opacity: 0,
         width: '0px', margin: '0px'
        }))
    ]
  )
]);

export const cardsAnimation = trigger('cardsAnimation', [
      transition(':enter', [
        query('@cardAnimation', stagger(300, animateChild()), { optional: true })
      ]),
]);

@Component({
  selector: 'app-backstage',
  templateUrl: './backstage.component.html',
  styleUrls: ['./backstage.component.css'],
  animations: [cardAnimation, cardsAnimation]
})
export class BackstageComponent implements OnInit {

  public cards: string[] = [
    "PA", "PK", "PQ", "PJ", "P10", "P9", "P8", "P7", "P6", "P5", "P4", "P3", "P2", 
    "CA", "CK", "CQ", "CJ", "C10", "C9", "C8", "C7", "C6", "C5", "C4", "C3", "C2", 
    "HA", "HK", "HQ", "HJ", "H10", "H9", "H8", "H7", "H6", "H5", "H4", "H3", "H2", 
    "BA", "BK", "BQ", "BJ", "B10", "B9", "B8", "B7", "B6", "B5", "B4", "B3", "B2", 
    "JJ"
  ];

  public stateCards  = {};

  interval: any;

  constructor(
    private dataexchangeService: DataexchangeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.getCardsState();
    this.interval = setInterval(() => { 
      this.getCardsState(); 
  }, 1000);
  }

  getJson(x){
    let z = x.replace(/'/g, '"');
    return JSON.parse(z);
  }

  getCardsState() {
      return this.dataexchangeService.getData('black-jack').subscribe((data: {}) => {
        if( data == null) {
          //console.log('Pusto');
          this.saveCardState();
        } else {
          this.stateCards = this.getJson(data);
          //console.log(this.stateCards);
        }
      })
  }

  saveCardState() {
      this.dataexchangeService.putData('black-jack', JSON.stringify(this.stateCards)).subscribe(data => {

      })
  }

}
