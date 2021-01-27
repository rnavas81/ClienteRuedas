import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validator, Validators} from '@angular/forms';

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
      emailF: ['', [Validators.required, Validators.email]],
      passwordF: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {  }

  login(){
    if (this.loginF.invalid) {
      return;
    }
    const user = {
      email: this.email,
      password: this.password
    };
    this.userService.loginSubscribe(user);
    console.log(this.userService.id);
    this.mensaje = this.userService.error;
  }
}
