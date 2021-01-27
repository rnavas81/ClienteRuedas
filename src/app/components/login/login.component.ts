import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validator} from '@angular/forms';

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

  constructor(public userService: UsersService) { }

  ngOnInit(): void {  }

  login(){
    const user = {
      email: this.email,
      password: this.password
    };
    this.userService.loginSubscribe(user);
    console.log(this.userService.id);
    this.mensaje = this.userService.error;
  }
}
