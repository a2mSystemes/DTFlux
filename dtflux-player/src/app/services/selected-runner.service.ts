import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectedRunnerService {

  private _data: number = 104;
  private _data2: number = 106;
  private mySwitch: boolean = false;
  private _selectedSubject: Subject<number>;
  int: NodeJS.Timer;
  constructor() {
    this._selectedSubject = new Subject<number>();
    setTimeout(() =>
    this._selectedSubject.next(this._data), 10);
this.int = setInterval(() => {
  if (this.mySwitch){
    this._selectedSubject.next(this._data);
    this.mySwitch = !this.mySwitch;
  }else{
    this._selectedSubject.next(this._data2);
    this.mySwitch = !this.mySwitch;
  }
}, 2000)

   }

  subscribeSelectedRunner() {
    return this._selectedSubject.asObservable();
  }
}
