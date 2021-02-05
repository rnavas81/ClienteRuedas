import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RuedaHorarioComponent } from '../components/rueda-horario/rueda-horario.component';
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
  get = async (id = null, callback) => {
    const url = environment.url_api + "rueda" + (id != null ? `/${id}` : '');
    var data = {};
    this.http.get(url, data).subscribe(
      response => {
        this.id = response["id"];
        this.nombre = response["nombre"];
        this.descripcion = response["descripcion"];
        this.origen = response["origen"];
        this.destino = response["destino"];
        this.horario = response["viajes"];

        if (typeof callback === 'function') callback(true);

      },
      error => {
        console.log(error);
        if (typeof callback === 'function') callback(false);

      }
    );
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
        th.textContent = item.hora;
        newElement.row.appendChild(th);
        idRow = tr_body.length;
        tr_body.push(newElement);

      }
      let td = document.createElement('td');
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

  // Función que consulta la rueda según la ID que le pasemos --> rueda/generada/1
  getRueda = (id=null) => {
    const url = environment.url_api + 'rueda/generada' + (!!id?`/${id}`:'');
    console.log(id,url);

    var data = {};
    return this.http.get(url, data);
  };


  setRueda = (rueda) => {
    this.nombre = rueda.nombre;
    this.descripcion = rueda.descripcion;
    this.origen = rueda.origen;
    this.destino = rueda.destino;
    this.horario = rueda.generada;
  }

  // // Agrega los viajes, si es el primer dia crea la fila y agrega una columna con las horas
  // generarCeldas = (item, primera, tr_body, type, user, i,mostrar=false,onclick=undefined) => {
  //   for (const key in item[type]) {
  //     const viaje = item[type][key];
  //     if (primera) {
  //       let tr = document.createElement('tr');
  //       tr.setAttribute('idRow',key);
  //       tr_body.push(tr);
  //       let th = document.createElement('th');
  //       th.textContent = key;
  //       tr.appendChild(th);
  //     }
  //     let td = document.createElement('td');
  //     td.dataset.hora = key;
  //     td.dataset.dia = item.dia;
  //     td.dataset.tipo = type;
  //     if(typeof onclick === 'function'){
  //       td.onclick = event => {
  //         onclick(event,td);
  //       }
  //     }
  //     viaje.forEach((coche) => {
  //       var c = document.createElement('div');
  //       if(mostrar){
  //         var div = document.createElement('div');
  //         div.classList.add('conductor');
  //         div.textContent = coche.conductor;
  //         c.appendChild(div);
  //         div = document.createElement('div');
  //         div.textContent = coche.pasajeros.join(', ');
  //         c.appendChild(div);
  //         if (coche.conductor == user || coche.pasajeros.find((e) => e == user)) {
  //           c.classList.add('bg-light');
  //         }
  //       }
  //       td.appendChild(c);
  //     });
  //     tr_body[i].appendChild(td);
  //     i++;
  //   }
  //   return i;
  // };



}
