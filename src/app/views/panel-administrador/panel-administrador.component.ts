import { Component, OnInit } from '@angular/core';
import * as iconos  from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {

  faPencil = iconos.faPencilAlt;
  faTrash = iconos.faTrash;
  faAddSquare = iconos.faPlusSquare;
  faArrowUp = iconos.faArrowUp;

  usuarios: any[] = [
    {
      "nombre": "Alejandro",
      "apellidos": "Martín",
      "correo": "alejandro@gmail.com"
    },
    {
      "nombre": "Jorge",
      "apellidos": "Olmo",
      "correo": "jorge@gmail.com"
    },
    {
      "nombre": "Rodrigo",
      "apellidos": "Arriaga",
      "correo": "rodrigo@gmail.com"
    },
  ]

  constructor() { }

  ngOnInit(): void {
    //this.generarTabla();
  }

  generarTabla = () => {
    var contenedor = document.getElementById('tablaUsuarios');
    var table = document.createElement("table");
    var thead = document.createElement("thead");
    var tr_thead = document.createElement("tr");
    var th_thead = document.createElement("th");
    var tbody = document.createElement("tbody");

    this.usuarios.forEach(usuario => {
      th_thead.innerText = usuario.nombre;
      tr_thead.appendChild(th_thead);
    });

    table.appendChild(thead);
    table.appendChild(tbody);
    contenedor.appendChild(table);
  }

}
