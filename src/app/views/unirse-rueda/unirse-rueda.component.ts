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
  celda: any;
  mensaje:string;
  ruedas: any;
  selected:number;

  estado = false;

  constructor(private router: Router,private formBuilder:FormBuilder,private ruedaService: RuedaService,public userService: UsersService) {
    this.mensaje="";
    ruedaService.getAll().subscribe(
      response => {
        this.ruedas=response;
      },
      error => console.error("error al recuperar")
    );
    this.userService.testLogin().subscribe(
      reponse => {

      },error => {
        this.userService.logout();
      }
    )
   }

  ngOnInit(): void {

    this.horarioSeleccionado = {}
    this.formRueda = this.formBuilder.group({
      nombre: [{value:''},[Validators.required]],
      descripcion: [{value:'',disabled:true}],
      origen: [{value:'',disabled:true}],
      destino: [{value:'',disabled:true}],
    });
    this.selected=0;

    if(!!this.ruedaService){
      this.formRueda.patchValue({
        nombre:this.ruedaService.nombre,
        descripcion:this.ruedaService.descripcion,
        origen:this.ruedaService.origen,
        destino:this.ruedaService.destino,
      })
    }


  }

  cambiarDatos = (id) => {
    // const id = this.formRueda.controls["nombre"].value;
    const data = this.ruedas.find(item=> item.id==id);
    this.formRueda.controls["descripcion"].setValue(data.descripcion);
    this.formRueda.controls["origen"].setValue(data.origen);
    this.formRueda.controls["destino"].setValue(data.destino);
    document.getElementById('btn-enviar').removeAttribute('disabled');
    this.selected=id;

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
    this.estado = true;
    this.mensaje="";
    if(Object.entries(this.horarioSeleccionado).length==0 && this.formRueda.controls["nombre"].valid){
      this.mensaje = "Debe seleccionar alguna hora del calendario"

    } else {
      const data = {
        idRueda:this.formRueda.controls["nombre"].value,
        horario:this.horarioSeleccionado
      }
      // Envia los datos para solicitar que el usuario sea agregado a la rueda
      this.userService.unirseRueda(data).subscribe(
        (response:any) => {
          // Guarda los nuevos datos del usuario
          this.userService.set(response.data);
          // Avanza hasta la página principal
          this.router.navigate(['/main']);

        }, error => {
          console.error(error);

        }
      )
    }
  }

}
