import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuedaService } from 'src/app/services/rueda.service';

@Component({
  selector: 'app-rueda-horario',
  templateUrl: './rueda-horario.component.html',
  styleUrls: ['./rueda-horario.component.scss'],
})
export class RuedaHorarioComponent implements OnInit {
  // Valores de entrada
  private _idRueda;
  get idRueda():number{
    return this._idRueda;
  }
  @Input()
  set idRueda(val:number){
    if(val!=this.idRueda){
      this._idRueda = val;
      this.cargarRueda();
    }
  }
  @Input() tipo: string = null;
  @Input() mostrarPasajeros: boolean;
  @Input() user: string = null;
  @Input() readonly = true;
  // Funciones de salida
  @Output() onclickCell = new EventEmitter<Object>();

  constructor(public ruedaService: RuedaService) {}

  ngOnInit(): void {
    this.cargarRueda();
  }
  cargarRueda = () => {
    switch (this.tipo) {
      case 'generada':
        this.ruedaService.getGenerada(this.idRueda).subscribe(
          (response) => {
            this.ruedaService.setData(response);
            this.recargar();
          },
          (error) => {
            console.log(error);
          }
        );
        break;
      default:
        this.ruedaService.get(this.idRueda).subscribe(
          (response) => {
            this.ruedaService.setData(response);
            this.recargar();
          },
          (error) => {
            console.log(error);
          }
        );
        break;
    }

  }
  recargar = () => {
    this.loadTable(
      this.ruedaService.getHtml({
        user: this.user,
        pasajeros: this.mostrarPasajeros,
        onclick: this.clickCell,
      })
    );
  };
  loadTable = (table: HTMLElement) => {
    document.getElementById('horario').innerHTML = '';
    document.getElementById('horario').appendChild(table);
  };
  clickCell = (event, item) => {
    if (this.readonly === false) {
      this.selectCell(item);
    }
    this.onclickCell.emit(item);
  };

  selectCell = (item) => {
    var horario = document.getElementById('horario');
    const hora = item.dataset.hora;
    const dia = item.dataset.dia;
    const tipo = item.dataset.tipo;
    var items = horario.querySelectorAll(
      `[data-dia='${dia}'][data-tipo='${tipo}']`
    );
    items.forEach((e) => {
      if (e instanceof HTMLElement) {
        if (e.dataset.hora === hora) {
          e.classList.add('bg-info');
        } else {
          e.classList.remove('bg-info');
        }
      }
    });
  };
}
