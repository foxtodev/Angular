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
        query('@cardAnimation', stagger(1000, animateChild()), { optional: true })
      ]),
]);

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    ),
    cardAnimation, cardsAnimation
  ]
})

export class ManageComponent implements OnInit {

  
  public cards: string[] = [
    "PA", "PK", "PQ", "PJ", "P10", "P9", "P8", "P7", "P6", "P5", "P4", "P3", "P2", 
    "CA", "CK", "CQ", "CJ", "C10", "C9", "C8", "C7", "C6", "C5", "C4", "C3", "C2", 
    "HA", "HK", "HQ", "HJ", "H10", "H9", "H8", "H7", "H6", "H5", "H4", "H3", "H2", 
    "BA", "BK", "BQ", "BJ", "B10", "B9", "B8", "B7", "B6", "B5", "B4", "B3", "B2", 
    "JJ"
  ];

  /*public stateCards: number[] = [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
    0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
    0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0,
    0
  ];*/

  public stateCards  = {};

  public playerState: number = 1;
  
  constructor(
    private dataexchangeService: DataexchangeService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    //this.stateCards.fill(0); //Fill array to 0

    /*console.log(this.stateCards);  
    this.JSONstr = JSON.stringify(this.stateCards);
    console.log(this.JSONstr);

    this.stateCards = [];
    console.log(this.stateCards);  

    this.stateCards = JSON.parse(this.JSONstr);
    console.log(this.stateCards);*/
    //this.saveCardState();
    this.getCardsState();

  }

  addCard(numCard: number) {
    this.stateCards[numCard] = this.playerState;
    this.saveCardState();
  }

  removeCard(numCard: number) {
    this.stateCards[numCard] = 0;
    this.saveCardState();
  }

  changePlayer(numPlayer: number) {
    this.playerState = numPlayer;
  }

  animRemoveCardStart(event) { }
      
  animRemoveCardEnd(event) { } 

  getJson(x){
    let z = x.replace(/'/g, '"');
    return JSON.parse(z);
  }

  getCardsState() {
      return this.dataexchangeService.getData('black-jack').subscribe((data: {}) => {
        if( data == null) {
          console.log('Pusto');
          this.saveCardState();
        } else {
          this.stateCards = this.getJson(data);
          console.log(this.stateCards);
        }
      })
  }

  saveCardState() {
      this.dataexchangeService.putData('black-jack', JSON.stringify(this.stateCards)).subscribe(data => {

      })
  }

  resetAll() {
    //this.stateCards = {};
    //this.stateCards.fill(0);
    //for(let i=0; i<53; i++) this.stateCards.push({state: 0, order: 0});
    //this.saveCardState();
  }

}
