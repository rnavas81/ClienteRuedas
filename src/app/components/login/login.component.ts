import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  mensaje: string;

  loginF: FormGroup;

  constructor(public userService: UsersService, private formBuilder: FormBuilder, private router: Router) {
    this.loginF = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.mensaje = this.userService.msg;
    this.userService.msg = null;
  }

  login() {
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
    // this.userService.loginSubscribe(user, (response) => {
    //   if (response) {
    //     this.userService.isNew().subscribe(
    //       (data) => {
    //         //console.log(data);
    //         if (data["registered"] === true) {
    //           switch (data['rol']) {
    //             case 1:
    //               this.router.navigate(['/main']);
    //               break;
    //             case 2:
    //               this.router.navigate(['/seleccionarRol']);
    //               break;
    //           }

    //         } else {
    //           this.router.navigate(['/unirse']);
    //         }
    //         return true;
    //       },
    //       (error) => {
    //         return false;
    //       }
    //     );
    //   } else {
    //     console.log(this.userService.error);

    //     this.mensaje = this.userService.error;
    //   }
    // });
    this.userService.login(user).subscribe(
      (data: any) => {
        this.userService.set(data);
        this.userService.isNew().subscribe(
          (data) => {            
            if (data["registered"] === true) {
              switch (this.userService.rol) {
                case 1:
                  this.router.navigate(['/main']);
                  break;
                case 2:
                  this.router.navigate(['/seleccionarRol']);
                  break;
              }
            } else {
              this.router.navigate(['/unirse']);
            }
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
