import { Component, OnInit, OnDestroy, HostBinding } from '@angular/core';

import { Observable } from "rxjs";
import { Rating } from '../../models/rating.model';
import { Top5Service } from '../../services/top5.service';
import { timer } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';

@Component({
  selector: 'app-top5',
  templateUrl: './top5.component.html',
  styleUrls: ['./top5.component.css'],
  /*animations: [
    trigger('routerTransition', [
      transition('* <=> *', [    
        query(':enter, :leave', style({ position: 'fixed', opacity: 1 })),
        group([ 
          query(':enter', [
            style({ opacity:0 }),
            animate('500ms ease-in-out', style({ opacity:1 }))
          ]),
          query(':leave', [
            style({ opacity:1 }),
            animate('500ms ease-in-out', style({ opacity:0 }))]),
        ])
      ])
    ])
   ]*/
   animations:[
    trigger('show', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate(500, style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate(500, style({ opacity: 0 }))
        ])
    ])
  ]
})
export class Top5Component implements OnInit {

  title = 'rating-top5';

  rating_slots: any = [];//{};// as Rating;
  rating_tables: any = [];//{};// as Rating;
  
  finalDate : Date = new Date("2021-06-01T06:00:00");
 
  rank = [ "Ruby", "Opal", "Sapphire" ];
  rankNow: number = 0;

  timeLeft: number = 10;
  interval;
  show: boolean = false;

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        //this.rankNow = this.rankNow > this.rank.length ? this.rankNow++ : 0;
        this.rankNow++;
        if(this.rankNow >= this.rank.length) this.rankNow = 0;

        //if(this.finalDate<=new Date()) this.finalR = true;

        this.getTop5Tables(this.rank[this.rankNow]);
        this.getTopSlots(this.rank[this.rankNow]);
        this.pauseTimer();
        
      }
    },1000)
  }

  pauseTimer() {
    this.show = !this.show;
    this.timeLeft = 10;
    this.startTimer2();
    clearInterval(this.interval);
  }

  timeLeft2: number = 1;
  interval2;

  startTimer2() {
    this.interval2 = setInterval(() => {
      if (this.timeLeft2 > 0) this.timeLeft2--; else this.pauseTimer2();
    }, 500)
  }

  pauseTimer2() {
    this.show = !this.show;
    this.timeLeft2 = 1;
    this.startTimer();
    clearInterval(this.interval2);
  }

  constructor(
    private top5Service: Top5Service,
    private route: ActivatedRoute,
    private router: Router,
  ) { }



  ngOnInit() {
    this.getTop5Tables(this.rank[this.rankNow]);
    this.getTopSlots(this.rank[this.rankNow]);
    this.startTimer();
    this.show = !this.show;
  }



  finalR: boolean = true;

  getTop5Tables(Rank) {
    if(this.finalR == false) {
      return this.top5Service.getRating(Rank, 'Table').subscribe((data: {}) => {    
        this.rating_tables = data;
        this.putTop5TablesCashe(Rank);
      });
    } else {
      this.getTop5TablesCashe(Rank)
    }
  }

  getTopSlots(Rank) {
    if(this.finalR == false) {
      return this.top5Service.getRating(Rank, 'Slot').subscribe((data: {}) => {        
        this.rating_slots = data;
        this.putTop5SlotsCashe(Rank);
      });
    } else {
      this.getTop5SlostCashe(Rank)
    }
  }

  getTop5TablesCashe(Rank) {
      return this.top5Service.getCache(Rank + 'Table').subscribe((data: {}) => {
          this.rating_tables = this.getJson(data);
      })
  }

  putTop5TablesCashe(Rank) {
      this.top5Service.putCache(Rank + 'Table', JSON.stringify(this.rating_tables)).subscribe(data => { })
  }

  getTop5SlostCashe(Rank) {
    return this.top5Service.getCache(Rank + 'Slot').subscribe((data: {}) => {
        this.rating_slots = this.getJson(data);
    })
}

  putTop5SlotsCashe(Rank) {
      this.top5Service.putCache(Rank + 'Slot', JSON.stringify(this.rating_slots)).subscribe(data => { })
  }

  format_number(num) {
    var n = num.toString();
    var separator = " ";
    return n.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + separator);
  }

  getJson(x){
  let z = x.replace(/'/g, '"');
  return JSON.parse(z);
  }

// public getRating(Rank, LocationType): Observable<Rating[]>{
//   var rating: any = [];
//   var ratingCache: any = [];
//   rating = this.loadRating(Rank, LocationType);
//   console.log();
//   // rating.subscribe((data: {}) => {
//   //   this.putCache(Rank + LocationType, JSON.stringify(data));
//   //   // this.getCache(Rank + LocationType).subscribe((data: {}) => {
//   //   //   console.log(data);
//   //   // });
//   // });
//   ratingCache = rating.pipe( map(res => res.stringValue) )
//   return rating;
// }

}
