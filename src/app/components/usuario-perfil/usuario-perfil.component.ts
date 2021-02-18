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
import { NavVerticalComponent } from '../vistaRueda/nav-vertical/nav-vertical.component';
import { UploadService } from 'src/app/services/upload.service';
import * as $ from 'jquery';

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

  selectedImage: any;
  servicesForm: any;

  @Output() accionRealizada: EventEmitter<any> = new EventEmitter();

  constructor(
    public userService: UsersService,
    public dropzone: NgxDropzoneModule,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private uploadService: UploadService
  ) {
    // console.log(this.userService.avatar);
    this.avatar = this.userService.avatar;
    this.edit = this.formBuilder.group({
      email: [userService.email, [Validators.required, Validators.email]],
      surname: [userService.surname, [Validators.required]],
      name: [userService.name, [Validators.required]],
      password: [''],
      password2: [''],
    });
  }

  ngOnInit(): void {}

  filedata: any;
  /* File onchange event */
  fileEvent(e) {
    this.filedata = e.target.files[0];

  }
  /* Upload button functioanlity */
  onSubmitform(f: NgForm) {
    var myFormData = new FormData();
    myFormData.append('image', this.filedata);
    myFormData.append('id', String(this.userService.id));
    console.log(myFormData);

    this.uploadService.upImg(myFormData).subscribe(
      (data) => {
        console.log(data['url']);
        let user = JSON.parse(sessionStorage.getItem('user'));
        user['avatar'] = data['url'];
        sessionStorage.setItem('user', JSON.stringify(user));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  send() {
    let dat = this.edit.value;
    var myFormData = new FormData();
    myFormData.append('image', this.filedata);
    myFormData.append('id', String(this.userService.id));
    myFormData.append('name', String(dat.name));
    myFormData.append('surname', String(dat.surname));
    myFormData.append('email', String(dat.email));
    myFormData.append('password', String(dat.password));
    myFormData.append('password2', String(dat.password2));
    console.log(myFormData);

    this.userService.modify(myFormData).subscribe(
      (data) => {
        console.log(data);
        this.mensaje = data['status'];
        console.log(data['status']);
        var user = JSON.parse(sessionStorage.getItem("user"));
        user['email'] = dat.email;
        user['name'] = dat.name;
        user['surname'] = dat.surname;
        user['avatar'] = data['url'];
        this.userService.email = dat.email;
        this.userService.name = dat.name;
        this.userService.surname = dat.surname;
        this.userService.avatar = data['url'];
        sessionStorage.setItem('user',JSON.stringify(user));
      },
      (error) => {
        this.mensaje = error.status;
        console.log(error.status);
      }
    );

    $("#carta_nominador").change(function(){
      var fichero_seleccionado = $(this).val();
      var nombre_fichero_seleccionado = fichero_seleccionado.replace(/.*[\/\\]/, ''); //Eliminamos el path hasta el fichero seleccionado
      $("#fichero_seleccionado").text(nombre_fichero_seleccionado);
    });
  }
}
