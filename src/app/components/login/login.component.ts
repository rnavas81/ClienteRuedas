import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  mensaje: string;

  estado = false;

  icons = iconos;

  loginF: FormGroup;

  constructor(public userService: UsersService, private formBuilder: FormBuilder, private router: Router) {
    this.loginF = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
    this.userService.testLogin().subscribe(
      reponse => {
        this.avanzar();
        console.log(reponse);
      }
    )
  }

  ngOnInit(): void {
    this.mensaje = this.userService.msg;
    this.userService.msg = null;
    // document.getElementById('op_usuario').setAttribute("selected", "selected");
  }

  login() {
    this.estado = true;
    this.mensaje = "";
    if (this.loginF.invalid) {
      return;
    }
    let datos = this.loginF.value;
    const user = {
      email: datos.email,
      password: datos.password
    };
    /**
     * Recuepra los datos del formulario e intenta acceder al sistema con ellos
     * Si accede comprueba si el usuario ya está en la rueda por defecto
     * Si está en la rueda accede a la página principal
     * Si no, accede al formulario para seleccionar su horario
     */
    this.userService.loginSubscribe(user, (response) => {
      if (response) {
        this.userService.set(response);
        this.avanzar();
      } else {
        // console.log(this.userService.error);
        this.mensaje = this.userService.error;
        this.estado = false;
      }
    });
  }

  avanzar = () => {
    this.userService.isNew().subscribe(
      (data) => {
        if (data["registered"] === true) {
          this.router.navigate(['/main']);
        } else {
          this.router.navigate(['/unirse']);
        }
        return true;
      },
      (error) => {
        return false;
      }
    );
  }
}
