import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RuedaService } from 'src/app/services/rueda.service';
import * as icons from '@fortawesome/free-solid-svg-icons';

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

  faCar = icons.faCar;
  faUsers = icons.faUsers;

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
          },
          (error) => {
            console.log(error);
          }
        );
        break;
    }

  }
  clickCell = (event) => {
    this.onclickCell.emit(event.target);
  };

}
