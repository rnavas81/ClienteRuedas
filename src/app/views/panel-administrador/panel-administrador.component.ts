import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AdministradorService } from 'src/app/services/administrador.service';
import { from, Observable } from 'rxjs';
import * as $ from 'jquery';


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
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  rol: string;
  rolNuevo: any;

  code: string;

  //Formulario
  registroForm: FormGroup;
  editForm: FormGroup;

  //Campos editar Usuario
  user: any[];
  editId: number;
  editName: string;
  editSurname: string;
  editEmail: string;
  editPassword1: string;
  editPassword2: string;
  editRol: string;

  //Errores
  error: string;

  //Lista de usuarios registrados en la BBDD
  usuarios: any[];

  rolAux: any;
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

    this.editForm = this.formBuilder.group({
      editName: ['', [Validators.required]],
      editSurname: ['', [Validators.required]],
      editEmail: ['', [Validators.required]],
      editPassword1: ['', [Validators.required]],
      editPassword2: ['', [Validators.required]],
      editRol: ['', [Validators.required]],
    })

  }

  onSubmit() {

    // Creo el usuario con los datos necesarios para la BBDD
    let usuario = this.registroForm.value;

    //Suscripción a la función de consulta a la API

    switch (usuario.rol) {
      case 'Administrador':
        usuario.rol = 1; break;
      case 'Usuario':
        usuario.rol = 2; break;
    }

    this.administrador.registrar(usuario).subscribe(
      (data) => {
        this.code = '200';
        this.cargarUsuariosBBDD();
        $('#createUser').modal('hide');
      },
      (error) => {
        console.error(error.status);
      }
    );
    
  }


  public cargarUsuariosBBDD = () => {
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


  editUser = (i) => {
    this.editId = this.usuarios[i].id;
    this.editName = this.usuarios[i].name;
    this.editSurname = this.usuarios[i].surname;
    this.editEmail = this.usuarios[i].email;
    this.editRol = this.usuarios[i].rol;
    this.user =  new Array();
    this.user["id"]=this.editId;
    this.user["name"]=this.editName;
    this.user["surname"]=this.editSurname;
    this.user["rol"]=this.editRol;
    console.log(this.user);
    
  }

  //Editar el usuario
  editar(indice) {

    this.usuarios[indice].email = document.getElementById('input' + indice).nodeValue;
  
    //Ponemos el rol correspondiente en el atributo del usuario
    switch (this.usuarios[indice].rol) {
      case 'Administrador':
        this.usuarios[indice].rol = 1;
        break;
      case 'Usuario':
        this.usuarios[indice].rol = 2;
        break;
    }

    this.administrador.editUser(this.usuarios[indice]).subscribe(
      (data) => {
        this.code = '200';
        this.cargarUsuariosBBDD();
        $('#editUser').modal('hide');
      },
      (error) => {
        console.error(error.status);
      }
    )
  }

  borrar(indice) {
    console.log(this.usuarios[indice]);

  }

}
