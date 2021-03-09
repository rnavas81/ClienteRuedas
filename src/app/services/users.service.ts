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
  access_token: any;
  error: string;
  msg: string;
  rol: number;
  rueda:number;

  constructor(private http: HttpClient, private router: Router) {
    if(sessionStorage.getItem(UsersService.SESSION_STORAGE_USER)){
      var data =JSON.parse(sessionStorage.getItem(UsersService.SESSION_STORAGE_USER));
      this.set(data);
    }
  }

  isLogged = () => {
    if (!!this.name) {
      return true;
    }else{
      return false;
    }
  }

  isAdmin = () => {
    if (!!this.rol && this.rol == 1) {
      return true
    }else{
      return false;
    }
  }
  testLogin = () => {
    const url = `${environment.url_api}usuario/test`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(url,'',extra);
  }

  testRol = () => {
    const url = `${environment.url_api}usuario/testRol`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(url,'',extra);
  }

  login(user: any) {
    return this.http.post(environment.url_api + 'login', user);
  }

  set = (data:any) => {
    if(data.hasOwnProperty('message'))delete(data.message);
    if(sessionStorage.getItem(UsersService.SESSION_STORAGE_USER)){
      const user = JSON.parse(sessionStorage.getItem(UsersService.SESSION_STORAGE_USER));
      if(!data.hasOwnProperty('id')) data.id = user.id;
      if(!data.hasOwnProperty('name')) data.name = user.name;
      if(!data.hasOwnProperty('surname')) data.surname = user.surname;
      if(!data.hasOwnProperty('email')) data.email = user.email;
      if(!data.hasOwnProperty('rol')) data.rol = user.rol;
      if(!data.hasOwnProperty('rueda')) data.rueda = user.rueda;
      if(!data.hasOwnProperty('avatar')) data.avatar = user.avatar;
    }
    this.id = data.id;
    this.name = data.name;
    this.surname = data.surname;
    this.email = data.email;
    this.rol = parseInt(data.rol);
    this.rueda = parseInt(data.rueda);
    this.avatar = data.avatar;
    if(data.hasOwnProperty('access_token')){
      console.log(this.access_token);
      this.access_token = data.acces_token;
      sessionStorage.setItem(UsersService.SESSION_STORAGE_TOKEN, data.access_token);
    }
    sessionStorage.setItem(UsersService.SESSION_STORAGE_USER,JSON.stringify(data));
    return 1;
  }

  loginSubscribe = (user, callback) => {
    this.login(user).subscribe(
      (data) => {
        this.set(data);
        this.error = null;
        if (typeof callback === 'function') callback(data);
      },
      (error) => {
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
        this.msg = 'Compruebe su email';
        this.router.navigate(['/login']);
      },
      (error) => {

      }
    );
  };

  recuperar(email: any){
    return this.http.post(environment.url_api + 'forget', email);
  }

  recuperarSubscribe = (email) => {
    this.recuperar(email).subscribe(
      (data) => {
        this.msg = 'Compruebe su email';
        this.router.navigate(['/login']);
      },
      (error) => {
        this.msg = 'Compruebe su email';
        this.router.navigate(['/login']);
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
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    data.idUser = this.id;
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
    console.log("isNew "+sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN));

    const url = `${environment.url_api}usuario/estado`;
    const data = { idUser: this.id };
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(url, data, extra);
  };

  /*logout = () => {
    return this.http.post(environment.url_api + 'logout');
  }*/

  edit = (user) => {
    const url = `${environment.url_api}usuario/edit`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };

    return this.http.post(url, user, extra);
  };

  // esto da problemas con passport
  modify(data:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'multipart/form-data');
    headers.append('X-Requested-With' , 'XMLHttpRequest');
    headers.append('Authorization','Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN));
    const url = `${environment.url_api}usuario/modify`;

    return this.http.post(url,data,{headers: headers});
  }

  logout = () => {
    this.logoutApi().subscribe(
      response => {
        this.resetVal();
        this.router.navigate(["/login"]);
      },
      error => {
        this.resetVal();
        this.router.navigate(["/login"]);
      }
    );
  }

  resetVal = () => {
    this.name = undefined;
    this.surname = undefined;
    this.email = undefined;
    this.access_token = undefined;
    sessionStorage.removeItem(UsersService.SESSION_STORAGE_TOKEN);
    sessionStorage.removeItem(UsersService.SESSION_STORAGE_USER);
  }

  logoutApi = () => {
    const url = `${environment.url_api}logout`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(url,'',extra);
  }

  delete = () => {
    const url = `${environment.url_api}usuario/deleteAccount`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(url,'',extra);
  }
}
