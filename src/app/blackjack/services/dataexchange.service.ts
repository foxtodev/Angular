import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataexchangeService {

  private REST_API_SERVER = 'http://backendreports.tigredecristal.local/api/single-string/';

  myHeaders = new HttpHeaders().set('content-type', 'application/json');

  handleError(error){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      errorMessage = error.erroe.message;
    } else {
      errorMessage = `ErrorCode: ${error.status}\nMessage: ${error.message}`
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
   }

  constructor(private http: HttpClient) { }

  public getData(varGame): Observable<any>{
    return this.http.post<any>(this.REST_API_SERVER + "/" + varGame, { headers: this.myHeaders })
    .pipe(
      map(res => res.stringValue),
      retry(1),
      catchError(this.handleError)
    )
  }

  public putData(varGame, strValue): Observable<any>{
    return this.http.put<any>(this.REST_API_SERVER + "/" + varGame, { "value": strValue }, { headers: this.myHeaders })
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

}

