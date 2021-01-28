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
    this.horario = []

  }
  /**
   *
   * @param id
   * @param callback función de vuelta con el valor true || false
   */
  get = async(id=null,callback) =>{
    const url = environment.url_api+"rueda"+(id!=null?'/id':'');
    var data = {};
    this.http.get(url,data).subscribe(
      response => {
        this.id = response["id"];
        this.nombre = response["nombre"];
        this.descripcion = response["descripcion"];
        this.origen = response["origen"];
        this.destino = response["destino"];
        this.horario = response["viajes"];
        if(typeof callback  === 'function')callback(true);

      },
      error => {
        console.log(error);
        if(typeof callback  === 'function')callback(false);

      }
    );
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
    // Almacena los dias
    var heads = [];
    // Almacena las filas con las celdas
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
      if(!heads.includes(item.dia)){
        heads.push(item.dia);
        // Agrega la cabecera
        var th = document.createElement('th');
        th.textContent = this.dias[item.dia];
        tr_head.appendChild(th);
      }

      var idRow = tr_body.findIndex(x=>x.hora==item.hora);
      if(idRow === -1){
        let newElement ={
          hora:item.hora,
          row : document.createElement('tr')
        }
        newElement.row.setAttribute('idRow',item.hora);
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
      if(typeof params.onclick === 'function'){
        td.onclick = event => {
          params.onclick(event,td);
        }
      }
      tr_body[idRow].row.appendChild(td);
    });
    //  Incluye cada fila de tr_body en el cuerpo
    tr_body.forEach((tr, index) => {
      tbody.appendChild(tr.row);
    });
    return table;
  };

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
