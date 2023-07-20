import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {


  constructor(private _httpClient: HttpClient) {

   }

}
