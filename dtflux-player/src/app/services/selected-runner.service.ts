import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedRunnerService {

  private _data: number = 104;
  private _selectedSubject: Subject<number>;
  constructor() {
    this._selectedSubject = new Subject<number>();
    this._selectedSubject.next(this._data);
   }

  subscribeSelectedRunner() {
    return this._selectedSubject.asObservable();
  }
}
