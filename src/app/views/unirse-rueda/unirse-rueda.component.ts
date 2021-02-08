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
  mensaje:string;

  constructor(private router: Router,private formBuilder:FormBuilder,rueda: RuedaService,public userService: UsersService,) {
    this.rueda = rueda;
    this.mensaje="";
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
    this.horarioSeleccionado[dia][tipo]=item.dataset.id;
  }

  /**
   * Función para el envío del formulario
   */
  onSubmit = () => {
    this.mensaje="";
    if(Object.entries(this.horarioSeleccionado).length==0){
      this.mensaje = "Debe seleccionar alguna hora del calendario"

    } else {
      const data = {
        idRueda:this.rueda.id,
        horario:this.horarioSeleccionado
      }
      // Envia los datos para solicitar que el usuario sea agregado a la rueda
      this.userService.unirseRueda(data).subscribe(
        (response:any) => {
          // Avanza hasta la página principal
          this.router.navigate(['/main']);

        }, error => {
          console.error(error);

        }
      )
    }
  }

}
