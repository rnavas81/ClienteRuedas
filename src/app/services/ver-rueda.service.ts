import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  constructor(private http: HttpClient) {
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
    var data = {};
    return this.http.get(url,data);
  };
}
