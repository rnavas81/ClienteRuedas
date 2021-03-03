import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { RuedaService } from 'src/app/services/rueda.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-lista-ruedas',
  templateUrl: './lista-ruedas.component.html',
  styleUrls: ['./lista-ruedas.component.scss'],
})
export class ListaRuedasComponent implements OnInit {
  //Font awesome
  faPencil = iconos.faPencilAlt;
  faTrash = iconos.faTrash;
  faAddSquare = iconos.faPlusSquare;

  //Modal
  modalTitulo: string;
  modalBoton: string;
  modalAccion: string;
  formularioModal: FormGroup;
  ruedas: any;
  seleccionado: number;
  idtemp: number;
  toast:any;

  constructor(
    private formBuilder: FormBuilder,
    private ruedasService: RuedaService,
    private userService:UsersService,
  ) {

    this.modalTitulo = 'Rueda';
    this.formularioModal = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      origen: ['', [Validators.required]],
    });
    this.ruedas = [];
    this.seleccionado = 0;

    // Comprobacion de que el usuario tiene el login
    this.userService.testLogin().subscribe(
      reponse => {

      },error => {
        this.userService.logout();
      }
    )

    // Comprobacion de que el usuario tiene el rol apropiado
    this.userService.testRol().subscribe(
      (reponse : any) => {
        if (reponse.rol != '1') {
          this.userService.logout();
        }
      },error => {
        this.userService.logout();
      }
    )
  }

  ngOnInit(): void {
    this.ruedasService.getAll().subscribe(
      (data) => {
        this.ruedas = data;
        this.idtemp = this.ruedas[this.ruedas.length-1].id;
      },
      (error) => {
        alert('Error al recuperar los datos de las ruedas');
      }
    );
  }
  /**
   * Busca una rueda en la lista por medio de su id
   * @param id identificador de la rueda
   */
  buscarRuedaById = id => {
    const index = this.ruedas.findIndex(item => item.id == id);
    return index;
  }

  /**
   * Asigna valores al modal para la nueva rueda
   */
  nueva = () => {
    this.modalTitulo = 'Nueva rueda';
    this.modalBoton = 'Agregar';
    this.modalAccion = 'crear';
    this.formularioModal.controls['id'].setValue(0);
    this.formularioModal.controls['nombre'].setValue('');
    this.formularioModal.controls['descripcion'].setValue('');
    this.formularioModal.controls['origen'].setValue('');
  };
  /**
   * Carga los valores de una rueda en el modal
   * @param index posición de la rueda a editar
   */
  editar = (id) => {
    const index = this.buscarRuedaById(id);
    this.seleccionado = id;
    this.modalTitulo = 'Editar rueda';
    this.modalBoton = 'Modificar';
    this.modalAccion = 'editar';
    this.formularioModal.controls['id'].setValue(this.ruedas[index].id);
    this.formularioModal.controls['nombre'].setValue(this.ruedas[index].nombre);
    this.formularioModal.controls['descripcion'].setValue(
      this.ruedas[index].descripcion
    );
    this.formularioModal.controls['origen'].setValue(this.ruedas[index].origen);
  };
  modalBorrar = (id) => {
    this.seleccionado = id;
  };

  onSubmit = () => {
    const data = this.formularioModal.value;

    document.getElementById('btn-cerrar-modal').click();
    // Envia al servicio de ruedas
    switch (this.modalAccion) {
      case 'crear':
        this.agregarRueda(data);
        break;
      case 'editar':
        this.modificarRueda(data);
        break;
      default:
        break;
    }
  };
  agregarRueda = (data) => {
    this.ruedasService.crear(data).subscribe(
      response => {
        this.ruedas.push(response);
        this.toast={
          text:'Rueda agregada',
          type:'success'
        };
      },
      error => {
        this.toast={
          text:'Error al agregar la rueda',
          type:'error'
        };
      }
    );
  };
  modificarRueda = (data) => {
    this.ruedasService.editar(data).subscribe(
      response => {
        const index = this.buscarRuedaById(this.seleccionado);
        this.ruedas[index]=data;
        this.toast={
          text:'Rueda modificada',
          type:'success'
        };
      },
      error => {
        this.toast={
          text:'Error al modificar la rueda',
          type:'error'
        };
      }
    );
  };
  borrarRueda = () => {
    this.ruedasService.borrar(this.seleccionado).subscribe(
      response => {
        const index = this.buscarRuedaById(this.seleccionado);
        this.ruedas.splice(index,1);
        this.toast={
          text:'Rueda eliminada',
          type:'warning'
        };
      }, error => {
        this.toast={
          text:'Error al borrar la rueda',
          type:'error'
        };
      }
    )
  };
}
