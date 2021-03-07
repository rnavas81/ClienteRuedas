import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from 'src/app/services/upload.service';
import * as $ from 'jquery';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { AdministradorService } from 'src/app/services/administrador.service';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss'],
})
export class UsuarioPerfilComponent implements OnInit {
  edit: FormGroup;
  mensaje: string;
  avatar: string;

  files: File[] = [];

  estado = false;

  icons = iconos;
  myFormData:any;

  selectedImage: any;
  servicesForm: any;
  toast:any;
  @Output() accionRealizada: EventEmitter<any> = new EventEmitter();

  constructor(
    public userService: UsersService,
    public dropzone: NgxDropzoneModule,
    private formBuilder: FormBuilder,
    private adminService: AdministradorService
  ) {
    this.myFormData = new FormData();
    this.avatar = this.userService.avatar;
    this.edit = this.formBuilder.group({
      email: [userService.email, [Validators.required, Validators.email]],
      surname: [userService.surname, [Validators.required]],
      name: [userService.name, [Validators.required]],
      password: [''],
      password2: [''],
    });
  }

  ngOnInit(): void {
  }

  filedata: any;
  /* File onchange event */
  fileEvent(e) {
    this.filedata = e.target.files[0];
    document.getElementById("fichero_seleccionado").textContent = this.filedata.name;
  }
  /* Upload button functioanlity */
  onSubmitform(f: NgForm) {
    var myFormData = new FormData();
    myFormData.append('image', this.filedata);
    myFormData.append('id', String(this.userService.id));

  }

  send() {
    this.estado = true;
    let dat = this.edit.value;
    this.myFormData.append('image', this.filedata);
    this.myFormData.append('id', String(this.userService.id));
    this.myFormData.append('name', String(dat.name));
    this.myFormData.append('surname', String(dat.surname));
    this.myFormData.append('email', String(dat.email));
    this.myFormData.append('password', String(dat.password));
    this.myFormData.append('password2', String(dat.password2));

    this.userService.modify(this.myFormData).subscribe(
      (data:any) => {
        this.toast = {text:"Datos actualizados",type:'success'};
        const user = {
          name:dat.name,
          surname:dat.surname,
          email:dat.email,
          avatar:data.avatar,
        }
        this.userService.set(user);
        this.estado = false;
      },
      (error) => {
        this.toast = {text:"Error al actualizar los datos",type:'error'}
        this.estado = false;
      }
    );
  }

  baja(){
    console.log(sessionStorage.getItem(UsersService.SESSION_STORAGE_TOKEN));
    this.userService.delete().subscribe(
      data => {
        this.userService.logout();
      },
      error => {
        this.userService.logout();
      });
  }

}
