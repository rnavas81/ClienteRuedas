import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdministradorService } from 'src/app/services/administrador.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-panel-administrador',
  templateUrl: './panel-administrador.component.html',
  styleUrls: ['./panel-administrador.component.scss']
})
export class PanelAdministradorComponent implements OnInit {

  //Font awesome
  faPencil = iconos.faPencilAlt;
  faTrash = iconos.faTrash;
  faAddSquare = iconos.faPlusSquare;

  //Datos del nuevo usuario
  name: string;
  surname: string;
  email: string;
  password: string;
  rol: string;

  code: string;

  //Formulario
  registroForm: FormGroup;

  //Errores
  error: string;

  //Lista de usuarios registrados en la BBDD
  usuarios: any[];

  constructor(private http: HttpClient, private formBuilder: FormBuilder, public administrador: AdministradorService) { }

  ngOnInit(): void {
    this.initForm();
    this.cargarUsuariosBBDD();
  }

  // Inicia el formulario
  private initForm(): void {
    //console.log(this.registroForm);

    this.registroForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });
  }

  private cargarUsuariosBBDD = () => {
    this.administrador.getUsers().subscribe(
      (data) => {                
        this.usuarios = data['listaUsuarios'];
        //console.log(this.usuarios);
        this.code = '200';
        //console.log(this.code);
      },
      (error) => {
        console.error(error.status);
      }
    );
  }


  // Crea un usuario nuevo
  onSubmit() {

    // Creo el usuario con los datos necesarios para la BBDD
    let usuario = this.registroForm.value;

    this.administrador.registrarSubscribe(usuario);
    $('#exampleModal').modal('hide');    

  }

  editar(indice) {
    console.log(this.usuarios[indice]);
  }

  borrar(indice){
    console.log(this.usuarios[indice]);
    
  }

}
