import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

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

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

  signup(){
    const user = {
      name: this.name,
      subname: this.subname,
      email: this.email,
      password: this.password,
      avatar: this.avatar
    };
    this.userService.register(user).subscribe(data => {
      console.log(data);
    });
  }
}
