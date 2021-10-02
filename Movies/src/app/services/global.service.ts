import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public myRoutes = [
    {path:"", key:"welcome"},
    {path:"user/register", key:"Register", isAuth:false},
    {path:"user/login", key:"login", isAuth:false}
  ]
  public myLoggedRoutes = [
    {path:"/home", key:"home"},
  ]

  public isLoggedIn = localStorage.getItem("Movies")? true:false
  public navMenu = localStorage.getItem("Movies")? this.myLoggedRoutes:this.myRoutes

  commonUrl = "http://localhost:3000/"
  constructor(private _http: HttpClient) { }

  register(data:any):Observable<any>{
    return this._http.post(`${this.commonUrl}user/register`, data)
  }

  login(data:any):Observable<any>{
    return this._http.post(`${this.commonUrl}user/login`, data)
  }
  
  me():Observable<any>{
    return this._http.post(`${this.commonUrl}user/me`, null)
  }
  logout():Observable<any>{
    return this._http.post(`${this.commonUrl}user/logout`, null)
  }

  deleteAcc():Observable<any>{
    return this._http.delete(`${this.commonUrl}users`)
  }

}
