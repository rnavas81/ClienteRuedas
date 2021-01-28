import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public static readonly SESSION_STORAGE_USER: string = "CAR_SHARE_USER";
  public static readonly SESSION_STORAGE_KEY: string = "CAR_SHARE_KEY";
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
  loginSubscribe = (user, callback) => {

    this.login(user).subscribe(data => {
      if (data instanceof Object) {
        this.id = data['id'];
        this.name = data['name'];
        this.subname = data['subname'];
        this.email = data['email'];
        if (typeof callback === 'function') callback(true);
      }
        localStorage.setItem('access_token', data['access_token']);
      this.error = null;
    } , error => {
      this.error = error.status;
    });
      if (typeof callback === 'function') callback(false);
  };
    return this.http.post(environment.url_api + 'signup', user);
  register(user: any){

  };

  registerSubscribe = user => {
    this.register(user).subscribe(data => {
      this.router.navigate(['/home']);
    }, error => {
      console.log(error.status);
    })
  };
  /**
   * Envía la petición para unirse a una rueda
   * @param data
   */
  unirseRueda = data => {
    const url = `${environment.url_api}usuario/unirse`;
    const extra = { headers:new HttpHeaders({'Content-Type': 'application/json'}) }
    data.idUser = this.id;
    return this.http.post(url,data,extra);
  }
    this.unirseRueda(data).subscribe(
  unirseRuedaSubscribe = data => {
      (response:any)=> {
        console.log(response);
        return true;
      } , error => {
        return false;
      }
    );
  }
  isNewCall = () => {
    const url = `${environment.url_api}usuario/estado`;
    const data = {idUser : this.id};
    const extra = { headers:new HttpHeaders({'Content-Type': 'application/json'}) }
    return this.http.post(url,data,extra);
  }
  isNew = () => {
      response => {
    this.isNewCall().subscribe(
        return true;
      } , error => {
      }
        return false;
    )
  }
}