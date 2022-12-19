import { Injectable } from '@angular/core';
import { HttpClient,  HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentURL } from '../enviroments/enviroments';
import { IUser } from '../modules/model/interfaces/IUser';
import { IResponse } from '../modules/model/interfaces/IResponse';
import { User } from '../modules/model/User';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url= environmentURL.apiURL;
  constructor(private http: HttpClient) { 
  }

  createUser(newUser: User): Observable<IResponse>{
    let urlUser= `${this.url}/access/signup`;
    let payload = new HttpParams()
    .set('correo', newUser.email)
    .set('contrasena', newUser.password);
    return this.http.post<IResponse>(urlUser, payload,{
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })});
  }

  getUserbyEmail(email : string): Observable<boolean>{
    let urlUser= `${this.url}/access/getByCorreo/${email}`;
    return this.http.get<boolean>(urlUser);
  }
  
  login(user:User):Observable<IResponse>{
    let urlUser= `${this.url}/access/login`;
    let payload = new HttpParams()
    .set('correo', user.email)
    .set('contrasena', user.password);
    return this.http.post<IResponse>(urlUser, payload,{
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded'
    })});
  }

  getByEmail(email:string) : Observable<IUser>{
    let urlUser= `${this.url}/access/getUserByEmail/${email}`;
    return this.http.get<IUser>(urlUser);


  }
}