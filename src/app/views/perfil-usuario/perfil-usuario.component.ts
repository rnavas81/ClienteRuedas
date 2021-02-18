import { Component, OnInit, ViewChild } from '@angular/core';
import { VerRuedaService } from 'src/app/services/ver-rueda.service';
import { UsersService } from 'src/app/services/users.service';
import { RuedaService } from 'src/app/services/rueda.service';
import { RuedaHorarioComponent } from 'src/app/components/rueda-horario/rueda-horario.component';


@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  rueda: any;
  @ViewChild (RuedaHorarioComponent) horario: RuedaHorarioComponent;



  //Atributos de la rueda
  origen: string;
  destino: string;
  nombre: string;
  descripcion: string;

  constructor(public userService: UsersService,public ruedaService: RuedaService) {
    this.rueda = ruedaService;

    this.nombre = this.rueda.nombre;
    this.descripcion = this.rueda.descripcion;
    this.origen = this.rueda.origen;
    this.destino = this.rueda.destino;
  }

  ngOnInit(): void {
  }
}
