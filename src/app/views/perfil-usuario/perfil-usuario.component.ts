import { Component, OnInit } from '@angular/core';
import { VerRuedaService } from 'src/app/services/ver-rueda.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {

  rueda: any;
  horario: any;

  constructor(rueda: VerRuedaService) {
    this.rueda = rueda;
  }
  
  ngOnInit(): void {
    
    this.rueda.getRueda().subscribe(
      response => {
        this.horario = response;
        console.log(this.horario.generada);
      }, error => {
        console.log(error);
      }
    )
  }

}
