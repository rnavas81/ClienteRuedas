import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  constructor(public http: HttpClient) { }

  //Llamada a createUser en la API
  registrar(nuevoUsuario: any) {
    return this.http.post(environment.url_api + 'administrador/createUser', nuevoUsuario);
  }

  //Llamada a la API que devuelve la lista de usuarios
  getUsers = () => {
    return this.http.get(environment.url_api + 'administrador/getUsers');
  }

  //LLamada a editUser en la API
  editUser = (usuario) => {
    return this.http.post(environment.url_api + 'administrador/editUser', usuario);
  }

  //Llamada a la API que borra el usuario
  deleteUser = (usuario) => {
    return this.http.post(environment.url_api + 'administrador/deleteUser', usuario);
  }

}
