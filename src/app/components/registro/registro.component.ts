import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar: string;

  registroF: FormGroup;

  icons = iconos;

  estado = false;

  constructor(public userService: UsersService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registroF = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      avatar:['']
    });

  }

  signup(){
    this.estado = true;
    let datos = this.registroF.value;
    const user = {
      name: datos.name,
      surname: datos.surname,
      email: datos.email,
      password: datos.password,
      avatar: ''
    };

    this.userService.registerSubscribe(user);

  }
}
