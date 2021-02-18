import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { log } from 'console';
import { type } from 'os';
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
  seleccionado: any;

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
    if( typeof this.horarioSeleccionado[item.dataset.dia] !== 'undefined'){
      if(typeof this.horarioSeleccionado[item.dataset.dia][item.dataset.tipo] !== 'undefined'){
        (<HTMLInputElement>document.getElementById('irSolo')).value=this.horarioSeleccionado[item.dataset.dia][item.dataset.tipo].opciones.irSolo;
        (<HTMLInputElement>document.getElementById('plazas')).value=this.horarioSeleccionado[item.dataset.dia][item.dataset.tipo].opciones.plazas;
      }
    }
    this.cambiaIrSolo();
    this.seleccionado = item;
    document.getElementById('AbrirModal').click();
  }
  agregarOpciones = () => {
    document.getElementById("cerrar-modal").click();
    let opcionesText = "";
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
        plazas:plazas
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
    this.mensaje="";
    if(Object.entries(this.horarioSeleccionado).length==0){
      this.mensaje = "Debe seleccionar alguna hora del calendario"

    } else {
      const data = {
        idRueda:this.rueda.id,
        horario:[]
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
          // Avanza hasta la página principal
          this.router.navigate(['/main']);

        }, error => {
          console.error(error);

        }
      )
    }
  }

}
