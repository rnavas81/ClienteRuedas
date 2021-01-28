import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  name: string;
  subname: string;
  email: string;
  password: string;
  avatar: string;

  registroF: FormGroup;

  constructor(public userService: UsersService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.registroF = this.formBuilder.group({
      name: ['', Validators.required],
      subname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      avatar:['']
    });

  }

  signup(){
    let datos = this.registroF.value;
    const user = {
      name: datos.name,
      subname: datos.subanem,
      email: datos.email,
      password: datos.password,
      avatar: this.avatar
    };
    console.log(user);

  }
}
