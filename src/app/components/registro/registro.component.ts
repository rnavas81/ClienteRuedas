import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  signin(){
    console.log(this.name);
    console.log(this.subname);
    console.log(this.email);
    console.log(this.password);
    console.log(this.avatar);
  }
}
