import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, TimeoutError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public static readonly SESSION_STORAGE_USER: string = "CAR_SHARE_USER";
  public static readonly SESSION_STORAGE_KEY: string = "CAR_SHARE_KEY";
  user: any;

  constructor(private http: HttpClient) {
    this.user = {
      id:1
    }
  }
  /**
   * Comprueba si el usuario puede acceder al sistema
   * @param user
   */
  login = user=> {
    const url = environment.url_api+"/login";
    return this.http.post(url, user);
  }

  loginSubscribe = (user:any) => {
    this.login(user).subscribe(
      (response:any) => {
        // Para implementación del token
        // this.user.access_token = response['message']['access_token'];
        // this.user.email = response.message.user.email;
        this.user = response;
        sessionStorage.setItem(UsersService.SESSION_STORAGE_KEY, JSON.stringify(this.user));
        return true;
      }, error => {
        console.log(error);

        return false;
      }
    );
  }

  register(user: any): Observable<any>{
    const url = environment.url_api+"/signup";
    return this.http.post(url, user);
  }

  unirseRueda = data => {
    const url = `${environment.url_api}/usuario/unirse/${this.user.id}`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(
      url,
      {
        'idRueda':1,
        'horario':data.horario
      } , {
        headers:headers
      }
    )
  }
  unirseRuedaSubscribe = data => {
    this.unirseRueda(data).subscribe(
      (response:any)=> {
        console.log(response);
        return true;
      } , error => {
        return false;
      }
    );
  }
}
