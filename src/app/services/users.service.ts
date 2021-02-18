import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public static readonly SESSION_STORAGE_USER: string = 'CAR_SHARE_USER';
  public static readonly SESSION_STORAGE_KEY: string = 'CAR_SHARE_KEY';
  id: number;

  name: string;
  surname: string;
  email: string;
  access_token: string;
  error: string;
  msg: string;
  rol: number;

  constructor(private http: HttpClient, private router: Router) {
    if(sessionStorage.getItem("user")){
      var data =JSON.parse(sessionStorage.getItem("user"));
      this.id = data['id'];
      this.name = data['name'];
      this.surname = data['surname'];
      this.email = data['email'];
      this.rol = data['rol'];
    }
  }

  login(user: any) {
    return this.http.post(environment.url_api + 'login', user);
  }

  set = data => {
    
    this.id = data['id'];
    this.name = data['name'];
    this.surname = data['surname'];
    this.email = data['email'];
    this.rol = parseInt(data['rol']);

    sessionStorage.setItem('access_token', data['access_token']);
    sessionStorage.setItem('user',JSON.stringify(data));
  }

  loginSubscribe = (user, callback) => {
    this.login(user).subscribe(
      (data) => {
        console.log(data);
        if (data instanceof Object) {
        }
        this.error = null;
        if (typeof callback === 'function') callback(data);
      },
      (error) => {
        this.error = error.status.toString();
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
        this.router.navigate(['/home']);
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

  logout = () => {
    this.name = undefined;
    this.surname = undefined;
    this.email = undefined;
    this.access_token = undefined;
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    this.router.navigate(["/"]);
  }

}
