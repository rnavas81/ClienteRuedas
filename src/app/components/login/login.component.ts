import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public userService: UsersService) { }

  ngOnInit(): void {
  }

  login(){
    const user = {
      email: this.email,
      password: this.password
    };
    this.userService.login(user).subscribe(data => {
      console.log(data);
    });
  }
}
