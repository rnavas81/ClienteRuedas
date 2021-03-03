import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class RuedaService {
  dias: string[];
  id: number;
  nombre: string;
  descripcion: string;
  origen: string;
  destino: string;
  horario: any;

  constructor(private http: HttpClient,public userService: UsersService) {
    this.dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];

    this.id = 1;
    this.nombre = 'IFP Virgen de Gracia';
    this.descripcion = 'En la ida se saldrá 30 minutos antes de la hora ';
    this.origen = 'Ciudad Real';
    this.destino = 'IFP Virgen de gracia';
    this.horario = this.formarTabla(null);
  }
  /**
   *
   * @param id
   */
  get = (id = null) => {
    const url = environment.url_api + 'rueda' + (id != null ? `/${id}` : '');
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.get(url,extra);
  };
  getAll = () => {
    const url = environment.url_api + 'rueda';
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.get(url,extra);
  };
  /**
   * Consulta la rueda según la ID que le pasemos --> rueda/generada/1
   * @param id
   */
  getGenerada = (id = null) => {
    const url = environment.url_api + 'rueda/generada' + (!!id ? `/${id}` : '');
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.get(url,extra);
  };
  setData = (data) => {
    this.id = data['id'];
    this.nombre = data['nombre'];
    this.descripcion = data['descripcion'];
    this.origen = data['origen'];
    this.destino = data['destino'];
    if (typeof data['viajes'] !== 'undefined') this.horario = this.formarTabla('viajes');
    else if (typeof data['generada'] !== 'undefined') this.horario = this.formarTabla('generada');
    else this.horario = this.formarTabla(null);
  };
  formarTabla = data => {
    if(data == null){
      return {dias:[],filas:[],}
    }
    var dias = [];
    var filas = [];

    return {
      dias:dias,
      filas:filas,
    }
  }
  /**
   * Genera la tabla html en función del horario
   */
  getHtml = (params) => {
    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tr_head = document.createElement('tr');
    var tbody = document.createElement('tbody');
    var th = document.createElement('th');
    // Almacena los dias
    var heads = [];
    // Almacena las filas con las celdas
    var tr_body = [];
    var primera = true;

    table.classList.add('table', 'table-bordered');
    thead.classList.add('text-center');
    table.appendChild(thead);
    thead.appendChild(tr_head);
    th.textContent = '##';
    tr_head.setAttribute('idRow', 'thead');
    tr_head.appendChild(th);
    // Crea el cuerpo
    table.appendChild(tbody);
    // Crea una array para contener las filas que formarán el cuerpo
    // Recorre los elementos del horario formando cada fila de la cabecera y el cuerpo
    this.horario.forEach((item, index) => {
      if (!heads.includes(item.dia)) {
        heads.push(item.dia);
        // Agrega la cabecera
        var th = document.createElement('th');
        th.textContent = this.dias[item.dia];
        tr_head.appendChild(th);
      }

      var idRow = tr_body.findIndex((x) => x.hora == item.hora);
      if (idRow === -1) {
        let newElement = {
          hora: item.hora,
          row: document.createElement('tr'),
        };
        newElement.row.setAttribute('idRow', item.hora);
        let th = document.createElement('th');
        if (item.tipo == 1) {
          th.style.color = 'darkred';
        } else {
          th.style.color = 'darkgreen';
        }
        th.textContent = item.hora;
        newElement.row.appendChild(th);
        idRow = tr_body.length;
        tr_body.push(newElement);
      }
      let td = document.createElement('td');
      td.classList.add('celda-horario');
      td.dataset.id = item.id;
      td.dataset.hora = item.hora;
      td.dataset.dia = item.dia;
      td.dataset.tipo = item.tipo;
      if (typeof params.onclick === 'function') {
        td.onclick = (event) => {
          params.onclick(event, td);
        };
      }
      if (typeof item.coches != 'undefined') {
        item.coches.forEach((coche) => {
          //console.log(coche);
          let va = false;
          let div = document.createElement('div');
          let conductor = document.createElement('h5');
          let pasajeros = document.createElement('small');
          conductor.innerText = coche.conductor;
          pasajeros.innerText = coche.pasajeros;
          pasajeros.className = 'd-block';

          if (
            coche.conductor ==
            this.userService.name + ' ' + this.userService.surname
          ) {
            va = true;
          }

          coche.pasajeros.forEach((pasajero) => {
            if (pasajero == this.userService.name + ' ' + this.userService.surname) {
              va = true;
            }
          });

          div.appendChild(conductor);
          div.appendChild(pasajeros);
          if (va) {
            div.classList.add('p-1', 'bg-light', 'text-white');
          } else {
            div.classList.add('p-1');
          }
          td.appendChild(div);
        });
      }

      tr_body[idRow].row.appendChild(td);
    });
    //  Incluye cada fila de tr_body en el cuerpo
    tr_body.forEach((tr, index) => {
      tbody.appendChild(tr.row);
    });
    return table;
  };
  /**
   * Envía datos para una nueva rueda
   * @param data Datos de la nueva rueda
   */
  crear = data => {
    const url = environment.url_api + 'rueda';
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.post(url, data, extra);
  }
  /**
   * Envia datos para modificar una rueda
   * @param data Datos para modificar la rueda
   */
  editar = data => {
    const url = environment.url_api + 'rueda';
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.put(url, data, extra);
  }
  /**
   * Envia datos para eliminar una rueda
   * @param id
   */
  borrar = id => {
    const url = environment.url_api + `rueda/${id}`;
    const extra = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' ,
       'X-Requested-With': 'XMLHttpRequest' ,
       'Authorization' : 'Bearer ' + sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN)}),
    };
    return this.http.delete(url, extra);
  }
}
