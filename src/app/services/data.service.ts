import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentURL } from '../enviroments/enviroments';
import { IUser } from '../modules/model/interfaces/IUser';
import { ICpData } from '../modules/model/interfaces/IPostalCode';
import {IBank, ISourceFunds} from '../modules/model/interfaces/IBank'
import { catchError, retry } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class DataService {

  private url= environmentURL.apiURL;
  constructor(private http: HttpClient) { 
  }

  getDataByPostalCode(postalCode: string): Observable<ICpData[]>{
    let urlSepoMex= `${this.url}/datoSepomex/getByCp/${postalCode}`;
    return this.http.get<ICpData[]>(urlSepoMex);
  }
  getBanks(): Observable<IBank[]>{
    let urlBank =`${this.url}/banco/getAllBancos`
    return this.http.get<IBank[]>(urlBank);
  }

  getSourcesFund(): Observable<ISourceFunds[]>{
    let urlSourcesFund= `${this.url}/origenFondo/allOrigenFondo`;
    return this.http.get<ISourceFunds[]>(urlSourcesFund);
  }
  
}