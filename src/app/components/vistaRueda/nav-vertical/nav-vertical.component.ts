import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-vertical',
  templateUrl: './nav-vertical.component.html',
  styleUrls: ['./nav-vertical.component.scss']
})
export class NavVerticalComponent implements OnInit {

  //Atributos del usuario
  nombreUsuario: string;
  apellidoUsuario: string;
  avatar: string;

  constructor(public userService: UsersService, private router: Router) {
    this.nombreUsuario = userService.name;
    this.apellidoUsuario = userService.surname;
    this.avatar = userService.avatar;
  }

  ngOnInit(): void {
  }

  cerrarSesion = () => {
    console.log("Cerrar sesion");
    this.userService.logout();
  };

  misRuedas = () =>{
    this.router.navigate(["/main"]);
  }

}
