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
  horario: any[];
  hora: string;
  viajes: string[];
  coches: string[];
  dia: string;
  tipo: string;
  conductor: string;
  pasajeros: string[];

  //Datos del usuario
  nombreUsuario: string;
  apellidoUsuario: string;

  constructor(private http: HttpClient, userService: UsersService) {
    this.dias = [
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado',
      'Domingo',
    ];
    this.nombreUsuario = userService.name;
    this.apellidoUsuario = userService.surname;

    this.id = 1;
    this.nombre = 'IFP Virgen de Gracia';
    this.descripcion = 'En la ida se saldrá 30 minutos antes de la hora ';
    this.origen = 'Ciudad Real';
    this.destino = 'IFP Virgen de gracia';
    this.horario = []

  }
  /**
   *
   * @param id
   * @param callback función de vuelta con el valor true || false
   */
  get = (id = null) => {
    const url = environment.url_api + "rueda" + (id != null ? `/${id}` : '');
    var data = {};
    return this.http.get(url, data);

  }
  // Función que consulta la rueda según la ID que le pasemos --> rueda/generada/1
  getGenerada = (id=null) => {
    const url = environment.url_api + 'rueda/generada' + (!!id?`/${id}`:'');
    var data = {};
    return this.http.get(url, data);
  };
  setData = data => {
    this.id = data["id"];
    this.nombre = data["nombre"];
    this.descripcion = data["descripcion"];
    this.origen = data["origen"];
    this.destino = data["destino"];
    if(typeof data["viajes"] !== 'undefined')this.horario = data["viajes"];
    if(typeof data["generada"] !== 'undefined')this.horario = data["generada"];

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

      var idRow = tr_body.findIndex(x => x.hora == item.hora);
      if (idRow === -1) {
        let newElement = {
          hora: item.hora,
          row: document.createElement('tr')
        }
        newElement.row.setAttribute('idRow', item.hora);
        let th = document.createElement('th');
        newElement.row.appendChild(th);
        idRow = tr_body.length;
        tr_body.push(newElement);
        th.textContent=item.hora;

        if(item.tipo==1){// Viajes de ida
          th.style.color="red";

        } else {// Viajes de vuelta
          th.style.color="green";
        }

      }
      let td = document.createElement('td');
      td.classList.add("celda-horario");
      td.dataset.id = item.id;
      td.dataset.hora = item.hora;
      td.dataset.dia = item.dia;
      td.dataset.tipo = item.tipo;
      if (typeof params.onclick === 'function') {
        td.onclick = event => {
          params.onclick(event, td);
        }
      }
      if (typeof item.coches != 'undefined') {

        item.coches.forEach(coche => {
          //console.log(coche);
          let va = false;
          let div = document.createElement('div');
          let conductor = document.createElement('h5');
          let pasajeros = document.createElement('small');
          conductor.innerText = coche.conductor;
          pasajeros.innerText = coche.pasajeros;
          pasajeros.className = "d-block";

          //console.log(coche.pasajeros);

          if (coche.conductor == (this.nombreUsuario + " " + this.apellidoUsuario)) {
            va = true;
          }

          coche.pasajeros.forEach(pasajero => {
            if(pasajero == (this.nombreUsuario + " " + this.apellidoUsuario)){
              va = true;
            }
          });

          div.appendChild(conductor);
          div.appendChild(pasajeros);
          if (va) {
            div.classList.add("p-1", "bg-light", "text-white");
          } else {
            div.classList.add("p-1");
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

  setRueda = (rueda) => {
    this.nombre = rueda.nombre;
    this.descripcion = rueda.descripcion;
    this.origen = rueda.origen;
    this.destino = rueda.destino;
    this.horario = rueda.generada;
  }
}
