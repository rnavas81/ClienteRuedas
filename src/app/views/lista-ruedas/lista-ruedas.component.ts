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
  faPlus = iconos.faPlus;

  //Modal
  modalTitulo: string;
  modalBoton: string;
  modalAccion: string;
  formularioModal: FormGroup;
  ruedas: any;
  seleccionado: number;
  toast: any;
  salidas: any;

  constructor(
    private formBuilder: FormBuilder,
    private ruedasService: RuedaService,
    private userService: UsersService
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
    this.salidas = [];

    // Comprobacion de que el usuario tiene el rol apropiado
    this.userService.testRol().subscribe(
      (reponse: any) => {
        if (reponse.rol != '1') {
          this.userService.logout();
        }
      },
      (error) => {
        this.userService.logout();
      }
    );
  }

  ngOnInit(): void {
    this.ruedasService.getAll().subscribe(
      (data) => {
        this.cargarRuedas(data);
      },
      (error) => {
        alert('Error al recuperar los datos de las ruedas');
      }
    );
  }
  cargarRuedas(data) {
    this.ruedas = data;
  }
  /**
   * Busca una rueda en la lista por medio de su id
   * @param id identificador de la rueda
   */
  buscarRuedaById = (id) => {
    const index = this.ruedas.findIndex((item) => item.id == id);
    return index;
  };

  /**
   * Asigna valores al modal para la nueva rueda
   */
  nueva = () => {
    this.seleccionado = null;
    this.modalTitulo = 'Nueva rueda';
    this.modalBoton = 'Agregar';
    this.modalAccion = 'crear';
    this.formularioModal.controls['id'].setValue(0);
    this.formularioModal.controls['nombre'].setValue('');
    this.formularioModal.controls['descripcion'].setValue('');
    this.formularioModal.controls['origen'].setValue('');
    this.salidas = [];
    this.agregarPuntoSalida();
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
    this.salidas = [...this.ruedas[index].salidas];
  };
  modalBorrar = (id) => {
    this.seleccionado = id;
  };

  onSubmit = () => {
    const data = this.formularioModal.value;
    data.salidas = this.getSalidas();
    if (this.formularioModal.valid && !!data.salidas) {
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
      document.getElementById('btn-cerrar-modal').click();
    } else {
      if (!this.formularioModal.valid) {
        this.toast = {
          text: 'Error en los campos del formulario',
          type: 'error',
        };
      }
      if (!data.salidas) {
        this.toast = {
          text: 'Debe haber un punto de salida como mínimo',
          type: 'error',
        };
      }
    }
  };
  /**
   * Recupera los datos de las salidas y comprueba que es valido
   * Para que sea valido debe haber por lo menos una salida
   * @returns {Array} con los datos de las salidas
   */
  getSalidas = () => {
    let data = [];
    var salidas = document.getElementsByName('salidas');
    if (salidas.length == 0) return false;
    let valido = false;
    salidas.forEach((item: HTMLInputElement) => {
      let salida = this.salidas.find((e) => e.id == item.dataset.punto);
      salida.nombre = item.value.trim();
      data.push(salida);
      if (salida.nombre.trim().length > 0) valido = true;
    });
    return valido ? data : false;
  };
  onCancel = () => {
    this.modalTitulo = '';
    this.modalBoton = '';
    this.modalAccion = null;
    this.formularioModal.controls['id'].setValue('');
    this.formularioModal.controls['nombre'].setValue('');
    this.formularioModal.controls['descripcion'].setValue('');
    this.formularioModal.controls['origen'].setValue('');
    this.salidas = [];
  };
  agregarRueda = (data) => {
    this.ruedasService.crear(data).subscribe(
      (response) => {
        this.ruedas.push(response);
        this.toast = {
          text: 'Rueda agregada',
          type: 'success',
        };
      },
      (error) => {
        this.toast = {
          text: 'Error al agregar la rueda',
          type: 'error',
        };
      }
    );
  };
  modificarRueda = (data) => {
    this.ruedasService.editar(data).subscribe(
      (response) => {
        const index = this.buscarRuedaById(this.seleccionado);
        // Sustituye el elemento del array por el nuevo.
        this.ruedas.splice(index, 1, response);
        this.toast = {
          text: 'Rueda modificada',
          type: 'success',
        };
      },
      (error) => {
        this.toast = {
          text: 'Error al modificar la rueda',
          type: 'error',
        };
      }
    );
  };
  borrarRueda = () => {
    this.ruedasService.borrar(this.seleccionado).subscribe(
      (response) => {
        const index = this.buscarRuedaById(this.seleccionado);
        this.ruedas.splice(index, 1);
        this.toast = {
          text: 'Rueda eliminada',
          type: 'success',
        };
      },
      (error) => {
        this.toast = {
          text: 'Error al borrar la rueda',
          type: 'error',
        };
      }
    );
  };
  agregarPuntoSalida = () => {
    this.salidas.push({
      id: Date.now(),
      id_rueda: this.seleccionado,
      nombre: '',
      status: 1,
    });
  };
  quitarPuntoSalida = (id) => {
    const index = this.salidas.findIndex((salida) => salida.id == id);
    this.salidas.splice(index, 1);
  };
}
