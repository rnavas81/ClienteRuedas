import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RuedaService } from 'src/app/services/rueda.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-unirse-rueda',
  templateUrl: './unirse-rueda.component.html',
  styleUrls: ['./unirse-rueda.component.scss']
})
export class UnirseRuedaComponent implements OnInit {
  formRueda: FormGroup;
  horarioSeleccionado: Object;
  @Input() rueda: any;
  celda: any;
  usuario: UsersService;

  constructor(private router: Router,private formBuilder:FormBuilder,rueda: RuedaService,usuario: UsersService) {
    this.rueda = rueda;
    this.usuario = usuario;
   }

  ngOnInit(): void {
    this.horarioSeleccionado = {}
    this.formRueda = this.formBuilder.group({
      nombre: ['',[Validators.required]],
      descripcion: ['',Validators.required],
      origen: ['',Validators.required],
      destino: ['',Validators.required],
    })

    if(!!this.rueda){
      this.formRueda.patchValue({
        nombre:this.rueda.nombre,
        descripcion:this.rueda.descripcion,
        origen:this.rueda.origen,
        destino:this.rueda.destino,
      })
    }

  }

  /**
   * Selecciona la celda
   */
  seleccionarHora = item => {
    const hora = item.dataset.hora;
    const dia = item.dataset.dia;
    const tipo = item.dataset.tipo;
    if(this.horarioSeleccionado[dia]==null)this.horarioSeleccionado[dia]={};
    this.horarioSeleccionado[dia][tipo]=hora;
  }

  /**
   * Función para el envío del formulario
   */
  onSubmit = () => {
    console.log(
      this.rueda.id,
      this.horarioSeleccionado,
      );
    const data = {
      idRueda:this.rueda.id,
      horario:this.horarioSeleccionado
    }
    // Envia los datos para solicitar que el usuario sea agregado a la rueda
    this.usuario.unirseRueda(data).subscribe(
      (response:any) => {
        // Avanza hasta la página principal
        this.router.navigate(['/main']);

      }, error => {
        console.error(error);

      }
    )
  }

}
