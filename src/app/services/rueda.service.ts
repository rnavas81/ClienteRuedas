import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private http: HttpClient) {
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
    this.horario = [
      {
        dia: 0,
        ida: {'08:30': [],'09:25': [],'10:20': [],
        },
        vuelta: {'12:40': [],'13:35': [],'14:30': [],},
      },
      {
        dia: 1,
        ida: {'08:30': [],'09:25': [],'10:20': [],},
        vuelta: {'12:40': [],'13:35': [],'14:30': [],},
      },
      {
        dia: 2,
        ida: {'08:30': [],'09:25': [],'10:20': [],},
        vuelta: {'12:40': [],'13:35': [],'14:30': [],},
      },
      {
        dia: 3,
        ida: {'08:30': [],'09:25': [],'10:20': [],},
        vuelta: {'12:40': [],'13:35': [],'14:30': [],},
      },
      {
        dia: 4,
        ida: {'08:30': [],'09:25': [],'10:20': [],},
        vuelta: {'12:40': [],'13:35': [],'14:30': [],},
      },
    ];

  }
  get = (id=null) =>{
    const url = environment.url_api+"/rueda"+(id!=null?'/id':'');
    var data = {};
    return this.http.get(url,{}).subscribe(
      response => {
        this.id = response.id;
        this.nombre = response.nombre;
        this.descripcion = response.descripcion;
        this.origen = response.origen;
        this.destino = response.destino;
        this.horario = response.horario;
        console.log(response);

      },
      error => {
        console.log(error);

      }
    );
    return data;
  }
  /**
   * Genera la tabla html en función del horario
   */
  getHtml = ( params) => {
    var user = typeof params.user === 'undefined' ? params.user :false;
    var pasajeros = typeof params.pasajeros === 'boolean' ? params.pasajeros : false;

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    var tr_head = document.createElement('tr');
    var tbody = document.createElement('tbody');
    var th = document.createElement('th');
    var tr_body = [];
    var primera = true;

    table.classList.add('table','table-bordered');
    thead.classList.add('text-center');
    table.appendChild(thead);
    thead.appendChild(tr_head);
    th.textContent = '##';
    tr_head.setAttribute('idRow','thead');
    tr_head.appendChild(th);
    // Crea el cuerpo
    table.appendChild(tbody);
    // Crea una array para contener las filas que formarán el cuerpo
    // Recorre los elementos del horario formando cada fila de la cabecera y el cuerpo
    this.horario.forEach((item, index) => {
      // Agrega la cabecera
      var th = document.createElement('th');
      th.textContent = this.dias[item.dia];
      tr_head.appendChild(th);
      var i = 0;
      i = this.generarCeldas(item, primera, tr_body, 'ida', user, i,pasajeros,params.onclick);

      tr_body[i - 1].classList.add('separador');
      this.generarCeldas(item, primera, tr_body, 'vuelta', user, i,pasajeros,params.onclick);

      primera = false;
    });
    //  Incluye cada fila de tr_body en el cuerpo
    tr_body.forEach((tr, index) => {
      tbody.appendChild(tr);
    });
    return table;
  };

  // Agrega los viajes, si es el primer dia crea la fila y agrega una columna con las horas
  generarCeldas = (item, primera, tr_body, type, user, i,mostrar=false,onclick=undefined) => {
    for (const key in item[type]) {
      const viaje = item[type][key];
      if (primera) {
        let tr = document.createElement('tr');
        tr.setAttribute('idRow',key);
        tr_body.push(tr);
        let th = document.createElement('th');
        th.textContent = key;
        tr.appendChild(th);
      }
      let td = document.createElement('td');
      td.dataset.hora = key;
      td.dataset.dia = item.dia;
      td.dataset.tipo = type;
      if(typeof onclick === 'function'){
        td.onclick = event => {
          onclick(event,td);
        }
      }
      viaje.forEach((coche) => {
        var c = document.createElement('div');
        if(mostrar){
          var div = document.createElement('div');
          div.classList.add('conductor');
          div.textContent = coche.conductor;
          c.appendChild(div);
          div = document.createElement('div');
          div.textContent = coche.pasajeros.join(', ');
          c.appendChild(div);
          if (coche.conductor == user || coche.pasajeros.find((e) => e == user)) {
            c.classList.add('bg-light');
          }
        }
        td.appendChild(c);
      });
      tr_body[i].appendChild(td);
      i++;
    }
    return i;
  };



}
