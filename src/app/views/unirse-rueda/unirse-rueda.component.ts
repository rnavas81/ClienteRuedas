import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RuedaService } from 'src/app/services/rueda.service';
import { UsersService } from 'src/app/services/users.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';


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
  seleccionado: any;
  salidas: any;
  titulomodal:string;

  estado = false;
  icons = iconos;

  constructor(private router: Router,private formBuilder:FormBuilder,private ruedaService: RuedaService,public userService: UsersService) {
    this.mensaje="";
    ruedaService.getAll().subscribe(
      response => {
        this.ruedas=response;
        if(this.userService.rueda>0){
          this.formRueda.controls['nombre'].setValue(this.userService.rueda);
          this.cambiarDatos(this.userService.rueda);
          this.seleccionado = this.userService.rueda;
        }
      },
      error => console.error("error al recuperar")
    );
   }

  ngOnInit(): void {

    this.horarioSeleccionado = {}
    this.formRueda = this.formBuilder.group({
      nombre: [{value:this.seleccionado},[Validators.required]],
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
    this.salidas = data.salidas;
    this.selected=id;

  }

  /**
   * Selecciona la celda
   */
  seleccionarHora = item => {
    if( typeof this.horarioSeleccionado[item.dataset.dia] !== 'undefined'){
      if(typeof this.horarioSeleccionado[item.dataset.dia][item.dataset.tipo] !== 'undefined'){
        (<HTMLInputElement>document.getElementById('irSolo')).value=this.horarioSeleccionado[item.dataset.dia][item.dataset.tipo].opciones.irSolo;
        (<HTMLInputElement>document.getElementById('plazas')).value=this.horarioSeleccionado[item.dataset.dia][item.dataset.tipo].opciones.plazas;
      }
    }
    this.cambiaIrSolo();
    this.seleccionado = item;
    if(item.dataset.tipo==1)this.titulomodal="Salida";
    else if(item.dataset.tipo==2)this.titulomodal="Vuelta";
    else this.titulomodal = "";
    document.getElementById('AbrirModal').click();
  }
  agregarOpciones = () => {
    document.getElementById("cerrar-modal").click();
    let opcionesText = "";
    const idsalida =parseInt((<HTMLInputElement>document.getElementById('salida')).value);
    const salida = this.salidas.find(i => i.id == idsalida);
    opcionesText += `Salida: ${salida.nombre}\n`;
    const irSolo =parseInt((<HTMLInputElement>document.getElementById('irSolo')).value);
    const plazas=parseInt((<HTMLInputElement>document.getElementById('plazas')).value);
    if(irSolo==1){
      opcionesText+="Voy solo";
    } else {
      opcionesText+=`Plazas libres ${plazas}`;
    }
    if(this.horarioSeleccionado[this.seleccionado.dataset.dia]==null){
      this.horarioSeleccionado[this.seleccionado.dataset.dia]={};
    }
    if(!!this.horarioSeleccionado[this.seleccionado.dataset.dia][this.seleccionado.dataset.tipo]) {
      this.horarioSeleccionado[this.seleccionado.dataset.dia][this.seleccionado.dataset.tipo].dia.textContent="";
    }
    this.horarioSeleccionado[this.seleccionado.dataset.dia][this.seleccionado.dataset.tipo]={
      dia:this.seleccionado,
      opciones:{
        irSolo:irSolo,
        plazas:plazas,
        salida:salida.id,
      }
    }
    this.seleccionado.textContent=opcionesText;
    this.selectCell(this.seleccionado);
  }
  cambiaIrSolo = () => {
    const irSolo =parseInt((<HTMLInputElement>document.getElementById('irSolo')).value);
    if(irSolo==0){
      document.getElementById('plazas').removeAttribute("disabled");
    } else if(irSolo==1){
      document.getElementById('plazas').setAttribute("disabled","true");
    }
  }
  selectCell = item => {
    var horario = document.getElementById('horario');
    const hora = item.dataset.hora;
    const dia = item.dataset.dia;
    const tipo = item.dataset.tipo;
    var items = horario.querySelectorAll(`[data-dia='${dia}'][data-tipo='${tipo}']`);
    items.forEach(e => {
      if (e instanceof HTMLElement) {
        if (e.dataset.hora === hora) {
          e.classList.add('bg-info');
        } else {
          e.classList.remove('bg-info');
        }
      }
    });

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
      for(var dia in this.horarioSeleccionado){
        var diaData = this.horarioSeleccionado[dia];
        data.horario[dia]={};
        for(var i in diaData){
          var seleccionado = diaData[i];
          data.horario[dia][seleccionado.dia.dataset.tipo]={
            id:seleccionado.dia.dataset.id,
            reglas:seleccionado.opciones
          }
        }
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
