import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { LoginComponent } from '../login/login.component';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrls: ['./recuperar.component.scss']
})
export class RecuperarComponent implements OnInit {

  estado = false;

  icons = iconos;

  @Input() login: LoginComponent;

  recuperar: FormGroup;
  constructor(public userService: UsersService, private formBuilder: FormBuilder,private router: Router) {
    this.recuperar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
  }

  forget(){
    this.estado = true;
    let datos = this.recuperar.value;
    let email = {email: datos.email};

    console.log(email);

    this.userService.recuperarSubscribe(email);
  }
}
