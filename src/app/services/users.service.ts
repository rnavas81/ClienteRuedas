import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public static readonly SESSION_STORAGE_USER: string = 'CAR_SHARE_USER';
  public static readonly SESSION_STORAGE_TOKEN: string = 'CAR_SHARE_KEY';
  id: number;

  name: string;
  surname: string;
  email: string;
  avatar: string;
  access_token: string;
  error: string;
  msg: string;

  constructor(private http: HttpClient, private router: Router) {
    if(sessionStorage.getItem(UsersService.SESSION_STORAGE_USER)){
      var data =JSON.parse(sessionStorage.getItem(UsersService.SESSION_STORAGE_USER));
      console.log(data);
      this.id = data['id'];
      this.name = data['name'];
      this.surname = data['surname'];
      this.email = data['email'];
      this.avatar = data['avatar']
    }
  }
  isLogged = () => {
    return !!sessionStorage.getItem(UsersService.SESSION_STORAGE_USER) && !!sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN);
  }

  login(user: any) {
    return this.http.post(environment.url_api + 'login', user);
  }

  loginSubscribe = (user, callback) => {
    this.login(user).subscribe(
      (data) => {
        if (data instanceof Object) {
          this.id = data['id'];
          this.name = data['name'];
          this.surname = data['surname'];
          this.email = data['email'];
          this.avatar = data['avatar'];
        }
        sessionStorage.setItem(UsersService.SESSION_STORAGE_TOKEN, data['access_token']);
        sessionStorage.setItem(UsersService.SESSION_STORAGE_USER,JSON.stringify(data));
        this.error = null;
        if (typeof callback === 'function') callback(true);
      },
      (error) => {
        console.log(error.error.message);
        if (error.error.message == null) {
          this.error = "500";
        }else{
          this.error = error.error.message;
        }
        if (typeof callback === 'function') callback(false);
      }
    );
  };

  register(user: any) {
    return this.http.post(environment.url_api + 'signup', user);
  }

  registerSubscribe = (user) => {
    this.register(user).subscribe(
      (data) => {
        this.error = '500';
        this.router.navigate(['/']);
      },
      (error) => {
        console.error(error.status);
      }
    );
  };

  recuperar(email: any){
    return this.http.post(environment.url_api + 'forget', email);
  }

  recuperarSubscribe = (email) => {
    this.recuperar(email).subscribe(
      (data) => {
        this.error = 'Compruebe su email';
        this.router.navigate(['/home']);
      },
      (error) => {
        this.msg = 'Compruebe su email';
        this.router.navigate(['/home']);
      }
    );
  };

  /**
   * Envía la petición para unirse a una rueda
   * @param data
   */
  unirseRueda = (data) => {
    const url = `${environment.url_api}usuario/unirse`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    data.idUser = this.id;
    console.log(data);

    return this.http.post(url, data, extra);
  };
  unirseRuedaSubscribe = (data) => {
    this.unirseRueda(data).subscribe(
      (response: any) => {
        return true;
      },
      (error) => {
        return false;
      }
    );
  };
  isNew = () => {
    const url = `${environment.url_api}usuario/estado`;
    const data = { idUser: this.id };
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.post(url, data, extra);
  };

  /*logout = () => {
    return this.http.post(environment.url_api + 'logout');
  }*/

  edit = (user) => {
    const url = `${environment.url_api}usuario/edit`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    return this.http.post(url, user, extra);
  };

  modify(data:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    const url = `${environment.url_api}usuario/modify`;

    return this.http.post(url,data,{headers: headers});
  }

  logout = () => {
    this.name = undefined;
    this.surname = undefined;
    this.email = undefined;
    this.access_token = undefined;
    sessionStorage.removeItem(UsersService.SESSION_STORAGE_TOKEN);
    sessionStorage.removeItem(UsersService.SESSION_STORAGE_USER);
    this.router.navigate(["/"]);
  }

}
