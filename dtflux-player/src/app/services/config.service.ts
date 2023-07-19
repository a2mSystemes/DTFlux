import { Injectable } from '@angular/core';
import * as conf from '../conf/dtflux-player.conf.json'
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private _confSubject: Subject<any> = new Subject<any>();
  private _conf = conf;

  conf(): any {
    return this._conf
  }

  getConf(key:string):any {
    const segments = key.split('.');
    let value = this._conf;
    for (const segment of segments) {
      value = (value as any)[segment];
      if (value === undefined) {
        break;
      }
    }
    return value;
  }

  setConf(key: string, newValue: any): void {
    const segments = key.split('.');
    let target = this._conf;
    const lastSegment = segments.pop();

    for (const segment of segments) {
      target = (target as any)[segment];
      if (target === undefined) {
        break;
      }
    }

    if (target !== undefined && lastSegment) {
      (target as any)[lastSegment] = newValue;
      this._confSubject.next(this._conf);
    }
  }

  exportConfigToJson(): string {
    return JSON.stringify(this._conf);
  }

  getChanges(): Observable<any>{
    return this._confSubject.asObservable();
  }

}
