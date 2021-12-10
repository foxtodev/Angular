import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Rating } from '../models/rating.model';

@Injectable({
  providedIn: 'root'
})

export class Top5Service {

  private serviceUrlHitPoints = 'http://backendreports.tigredecristal.local/api/hit-points';
  //private serviceUrlHitPoints = 'http://backendreports.tigredecristal.local/api';

  private REST_API_CACHE = 'http://backendreports.tigredecristal.local/api/single-string/';

  handleError(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.erroe.message;
    } else {
      errorMessage = `ErrorCode: ${error.status}\nMessage: ${error.message}`
    }
    //window.alert(errorMessage);
    console.log(errorMessage);
    return throwError(errorMessage);
   }

  constructor( private http: HttpClient ) { }

  myHeaders = new HttpHeaders().set('content-type', 'application/json');

  
  public getRating(Rank, LocationType): Observable<Rating[]>{
    //return this.http.post<Rating[]>(this.serviceUrlHitPoints, { "rank": Rank, "locationType": LocationType }, { headers: this.myHeaders });
    return this.http.post<Rating[]>(this.serviceUrlHitPoints, { "rank": Rank, "locationType": LocationType }, { headers: this.myHeaders })
    .pipe(
      //map(res => res.stringValue),
      retry(1),
      catchError(this.handleError)
    )
  }

  public getCache(varRank): Observable<any>{
    return this.http.post<any>(this.REST_API_CACHE + "/" + varRank, { headers: this.myHeaders })
    .pipe(
      map(res => res.stringValue),
      retry(1),
      catchError(this.handleError)
    )
  }

  public putCache(varRank, strValue): Observable<any>{
    return this.http.put<any>(this.REST_API_CACHE + "/" + varRank, { "value": strValue }, { headers: this.myHeaders })
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}
