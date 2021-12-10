import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JackpotSlotTable } from '../models/jackpot-slot-table.model';
import { WinnersTable } from '../models/winners-table.model';
@Injectable({
  providedIn: 'root'
})

export class JackpotService {

  private serviceUrlSlotTable = 'http://backendreports.tigredecristal.local/api/player-location';
  private serviceUrlSlot = 'http://backendreports.tigredecristal.local/api/player-location/slot';
  private serviceUrlTable = 'http://backendreports.tigredecristal.local/api/player-location/table';

  private serviceUrlRandomSlot = 'http://backendreports.tigredecristal.local/api/player-location/random/slot';
  private serviceUrlRandomTable = 'http://backendreports.tigredecristal.local/api/player-location/random/table';

  private serviceUrlWinnerTable = 'http://backendreports.tigredecristal.local/api/player-location/random/admin';
  private serviceUrlDeleteWinnerTable = 'http://backendreports.tigredecristal.local/api/player-location/random';
  

  constructor(private http: HttpClient) { }

  myHeaders = new HttpHeaders().set('content-type', 'application/json');

  public getJackpotRandomSlot(): Observable<JackpotSlotTable[]> {
    return this.http.post<JackpotSlotTable[]>(this.serviceUrlRandomSlot, { headers: this.myHeaders });
  }

  public getJackpotRandomTable(): Observable<JackpotSlotTable[]> {
    return this.http.post<JackpotSlotTable[]>(this.serviceUrlRandomTable, { headers: this.myHeaders });
  }

  public getJackpotSlot(): Observable<JackpotSlotTable[]> {
    return this.http.post<JackpotSlotTable[]>(this.serviceUrlSlot, { headers: this.myHeaders });
  }

  public getJackpotTable(): Observable<JackpotSlotTable[]> {
    return this.http.post<JackpotSlotTable[]>(this.serviceUrlTable, { headers: this.myHeaders });
  }
  
  public getJackpotSlotTable(): Observable<JackpotSlotTable[]> {
    return this.http.post<JackpotSlotTable[]>(this.serviceUrlSlotTable, { headers: this.myHeaders });
  }

 public getActiveAllSlots() {
  return this.http.post(this.serviceUrlSlot, { headers: this.myHeaders })
  .pipe( map((response: JackpotSlotTable[]) => response.map(slottable => slottable.location)) );
 }

 public getActiveAllTables() {
  return this.http.post(this.serviceUrlTable, { headers: this.myHeaders })
  .pipe( map((response: JackpotSlotTable[]) => response.map(slottable => slottable.location)) );
 }

 public getWinnersTable(): Observable<WinnersTable[]> {
  return this.http.post<WinnersTable[]>(this.serviceUrlWinnerTable, { headers: this.myHeaders });
}

  public WinnersTableDelete() {
    return this.http.delete(this.serviceUrlDeleteWinnerTable, { headers: this.myHeaders });

  }

}
