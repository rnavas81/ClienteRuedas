import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any>{
    return this.http.post("http://127.0.0.1:8000/api/login", user);
  }

  register(user: any): Observable<any>{
    return this.http.post("http://127.0.0.1:8000/api/signup", user);
  }
}
