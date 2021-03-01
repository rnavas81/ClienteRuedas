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
    console.log('Esto es en el constructor');
    console.log(this.access_token);
  }

  isLogged = async () => {
    var is = false;
    await this.testLogin().subscribe(
      reponse => {
        is=true;
        console.log(reponse);

      },error=>{is=false}
    )
    console.log('Esto es isLogin');
    console.log(is);
    return is;
    // return !!sessionStorage.getItem(UsersService.SESSION_STORAGE_USER) && !!sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN);
  }
  testLogin = () => {
    const url = `${environment.url_api}usuario/test`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + this.access_token}),
    };
    console.log('Dentro del testlogin');
    console.log(this.access_token);
    return this.http.post(url,'',extra);
  }

  testRol = () => {
    const url = `${environment.url_api}usuario/testRol`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + this.access_token}),
    };
    console.log('Dentro del testlogin');
    console.log(this.access_token);
    return this.http.post(url,'',extra);
  }

  login(user: any) {
    return this.http.post(environment.url_api + 'login', user);
  }

  set = (data:any) => {
    if (!!data.id) {
      this.id = data.id;
    }else{
      data.id = this.id;
    }

    if (!!data.name) {
      this.name = data.name;
    }else{
      data.name = this.name;
    }

    if (!!data.surname) {
      this.surname = data.surname;
    }else{
      data.surname = this.surname;
    }

    if (!!data.email) {
     this.email = data.email;
    }else{
      data.email = this.email;
    }

    if (!!data.avatar) {
      this.avatar = data.avatar;
    }else{
      data.avatar = this.avatar;
    }

    if (!!data.access_token) {
      this.access_token = data.access_token;
      sessionStorage.setItem(UsersService.SESSION_STORAGE_TOKEN, data.access_token);
    }
    console.log('Esto es el tocken de acceso en el set ')
    console.log(this.access_token);
    if (!!data.rol) {
     this.rol = data.rol;
    }else{
      data.rol = this.rol;
    }

    if (!!data.rueda) {
     this.rueda = data.rueda;
    }else{
      data.rueda = this.rueda;
    }
    sessionStorage.setItem(UsersService.SESSION_STORAGE_USER,JSON.stringify(data));
  }

  loginSubscribe = (user, callback) => {
    this.login(user).subscribe(
      (data) => {
        this.set(data);
        console.log('Esto es login');
        console.log(data);
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
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + this.access_token}),
    };
    console.log('ESTO ES DE EXTRA');
    console.log(extra);
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
    const url = `${environment.url_api}usuario/estado`;
    const data = { idUser: this.id };
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + this.access_token}),
    };
    console.log('ESTO ES DE EXTRA');
    console.log(extra);
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
       'Authorization' : 'Bearer ' + this.access_token}),
    };
    console.log('ESTO ES DE EXTRA');
    console.log(extra);

    return this.http.post(url, user, extra);
  };

  // esto da problemas con passport
  modify(data:any){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'multipart/form-data');
    headers.append('X-Requested-With' , 'XMLHttpRequest');
    headers.append('Authorization','Bearer ' + this.access_token);
    console.log(headers);
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
