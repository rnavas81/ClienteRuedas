import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  id: number;
  name: string;
  subname: string;
  email: string;
  access_token: string;
  error: string;

  constructor(private http: HttpClient, private router: Router) { }

  login(user: any){
    return this.http.post(environment.url_api + 'login', user);
  }

  loginSubscribe = user => {
    this.login(user).subscribe(data => {
      if (data instanceof Object) {
        this.id = data.id;
        this.name = data.name;
        this.subname = data.subname;
        this.email = data.email;
        localStorage.setItem('access_token', data.access_token);
      }
      this.error = null;
      console.log(data);
    } , error => {
      console.log(error);
      this.error = error.status;
    });
  };

  register(user: any){
    return this.http.post(environment.url_api + 'signup', user);
  };

  registerSubscribe = user => {
    this.register(user).subscribe(data => {
      console.log(data);
      this.router.navigate(['/home']);
    }, error => {
      console.log(error.status);
    })
  };
}
