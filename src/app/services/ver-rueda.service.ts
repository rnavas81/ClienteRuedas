import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class VerRuedaService {
  dias: string[];
  id: number;
  nombre: string;
  descripcion: string;
  origen: string;
  destino: string;

  constructor(private http: HttpClient, private userService: UsersService) {
    this.dias = [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
      'Domingo',
    ]
  }

  getRueda = (id) =>  {
    const url = environment.url_api + '/rueda/generada/' + id;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.get(url,extra);
  };
}
