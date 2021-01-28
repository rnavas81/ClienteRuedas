import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(public userService: UsersService, private formBuilder: FormBuilder) {
    this.loginF = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {  }

  login(){
    if (this.loginF.invalid) {
      return;
    }
    let datos = this.loginF.value;
    const user = {
      email: datos.email,
      password: datos.password
    };
    this.userService.loginSubscribe(user,(response) => {
      if (response) {
        console.log(this.userService.id);
      }else{
        this.mensaje = this.userService.error;
      }
    });
  }
}
