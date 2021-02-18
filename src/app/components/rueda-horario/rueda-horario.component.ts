import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuedaService } from 'src/app/services/rueda.service';
import * as faicons from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-rueda-horario',
  templateUrl: './rueda-horario.component.html',
  styleUrls: ['./rueda-horario.component.scss']
})
export class RuedaHorarioComponent implements OnInit {
  // Valores de entrada
  @Input() idRueda: number=1;
  @Input() tipo: string=null;
  @Input() mostrarPasajeros: boolean;
  @Input() user: string = null;
  @Input() readonly = true;
  // Funciones de salida
  @Output() onclickCell = new EventEmitter<Object>();

  constructor(public rueda: RuedaService) {
  }

  ngOnInit(): void {
    switch (this.tipo) {
      case 'generada':
        this.rueda.getGenerada(this.idRueda).subscribe(
          response => {
            this.rueda.setData(response);
            this.recargar();
          },
          error=> {console.log(error);
          }
        );
        break;

      default:
        this.rueda.get().subscribe(
          response => {
            this.rueda.setData(response);
            this.recargar();
          },
          error=> {console.log(error);
          }
        );
        break;
    }

  }
  recargar = () => {
    this.loadTable(this.rueda.getHtml({
      user: this.user,
      pasajeros: this.mostrarPasajeros,
      onclick: this.clickCell
    }))

  }
  loadTable = (table: HTMLElement) => {
    document.getElementById('horario').innerHTML = "";
    document.getElementById('horario').appendChild(table);
  }
  clickCell = (event, item) => {
    if (this.readonly === false) {
      this.selectCell(item);
    }
    this.onclickCell.emit(item);
  }

  selectCell = item => {

  }
}
