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

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    // formData.append("file[]",this.files[0]);
    for (var i = 0; i < this.files.length; i++) {
      formData.append('file[]', this.files[i]);
    }

    this.http
      .post('http://127.0.0.1:8000/api/upload', formData)
      .subscribe((res) => {
        console.log(res);
        alert('Uploaded Successfully.');
      });

    console.log(formData);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  send() {
    let dat = this.edit.value;
    const user = {
      id: this.userService.id,
      name: dat.name,
      surname: dat.surname,
      email: dat.email,
      password: dat.password,
      password2: dat.password2,
    };
    console.log(user);
    this.userService.edit(user).subscribe(
      (data) => {
        console.log(data);
        this.mensaje = data['status'];
        console.log(data['status']);
        this.userService.email = user.email;
        this.userService.name = user.name;
        this.userService.surname = user.surname;
        sessionStorage.setItem('user', JSON.stringify(user));
      },
      (error) => {
        this.mensaje = error.status;
        console.log(error.status);
      }
    );


    (function (document, window, index) {
      var inputs = document.querySelectorAll('.inputfile');
      Array.prototype.forEach.call(inputs, function (input) {
        var label = input.nextElementSibling,
          labelVal = label.innerHTML;

        input.addEventListener('change', function (e) {
          var fileName = '';
          if (this.files && this.files.length > 1)
            fileName = (
              this.getAttribute('data-multiple-caption') || ''
            ).replace('{count}', this.files.length);
          else fileName = e.target.value.split('\\').pop();

          if (fileName) label.querySelector('span').innerHTML = fileName;
          else label.innerHTML = labelVal;
        });
      });
    })(document, window, 0);
  }
}
