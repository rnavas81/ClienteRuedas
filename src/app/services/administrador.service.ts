import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  code: string;

  constructor(public http: HttpClient) { }


  registrarSubscribe = (usuario) => {
    //Suscripción a la función de consulta a la API

    switch (usuario.rol) {
      case 'Administrador':
        usuario.rol = 1; break;
      case 'Usuario':
        usuario.rol = 2; break;
    }

    this.registrar(usuario).subscribe(
      (data) => {
        this.code = '200';
        console.log(this.code);
      },
      (error) => {
        console.error(error.status);
      }
    );
  }

  //Función creación usuario en la API
  registrar(nuevoUsuario: any) {
    return this.http.post(environment.url_api + 'administrador/createUser', nuevoUsuario);
  }

  getUsers = () => {
    return this.http.get(environment.url_api + 'administrador/getUsers');
  }

}
