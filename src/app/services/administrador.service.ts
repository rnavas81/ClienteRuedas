import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(public http: HttpClient, private userService: UsersService) { }

  //Llamada a createUser en la API
  registrar(nuevoUsuario: any) {
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(environment.url_api + 'administrador/createUser', nuevoUsuario, extra);
  }

  //Llamada a la API que devuelve la lista de usuarios
  getUsers = () => {
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.get(environment.url_api + 'administrador/getUsers', extra);
  }

  //LLamada a editUser en la API
  editUser = (usuario) => {
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(environment.url_api + 'administrador/editUser', usuario, extra);
  }

  //Llamada a la API que borra el usuario
  deleteUser = (usuario) => {
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(environment.url_api + 'administrador/deleteUser', usuario, extra);
  }

}
