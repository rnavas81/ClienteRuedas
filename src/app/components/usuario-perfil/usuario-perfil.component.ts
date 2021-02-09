import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.scss']
})
export class UsuarioPerfilComponent implements OnInit {

  name: any;
  surname: any;

  files: File[] = [];

  constructor(public userService: UsersService, public dropzone: NgxDropzoneModule) {
    this.name = userService.name;
    this.surname = userService.surname;
  }

  ngOnInit(): void {

  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
