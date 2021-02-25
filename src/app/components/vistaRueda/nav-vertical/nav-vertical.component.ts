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
  esAdmin: number;

  constructor(public userService: UsersService, private router: Router) {
    this.nombreUsuario = userService.name;
    this.apellidoUsuario = userService.surname;
    this.avatar = userService.avatar;
    this.esAdmin = userService.rol;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.seleccionarRuta();
  }

  cerrarSesion = () => {
    console.log("Cerrar sesion");
    this.userService.logout();
  };

  seleccionarRuta = () => {

    let item;

    switch (this.router.url) {
      case "/editProfile":
        item = document.getElementsByName('editProfile')[0];
        break;

      case "/main":
        item = document.getElementsByName('main')[0];
        break;

      case "/acercaDe":
        item = document.getElementsByName('acercaDe')[0];
        break;

      case "/adminRuedas":
        item = document.getElementsByName('adminRuedas')[0];
        break;

      case "/adminUsuarios":
        item = document.getElementsByName('adminUsuarios')[0];
        break;
    }

    this.limpiarClases();
    item.classList.remove("btn-secondary");
    item.classList.add("active", "font-weight-bold", "btn-outline-secondary", "py-2");

  }

  limpiarClases = () => {
    console.log("Limpiando clases");

    document.getElementsByName('editProfile')[0].classList.remove("active", "font-weight-bold", "btn-outline-secondary");
    document.getElementsByName('editProfile')[0].classList.add("btn-secondary");

    document.getElementsByName('main')[0].classList.remove("active", "font-weight-bold", "btn-outline-secondary");
    document.getElementsByName('main')[0].classList.add("btn-secondary");

    document.getElementsByName('acercaDe')[0].classList.remove("active", "font-weight-bold", "btn-outline-secondary");
    document.getElementsByName('acercaDe')[0].classList.add("btn-secondary");

    if (this.esAdmin == 1) {
      document.getElementsByName('adminRuedas')[0].classList.remove("active", "font-weight-bold", "btn-outline-secondary");
      document.getElementsByName('adminRuedas')[0].classList.add("btn-secondary");

      document.getElementsByName('adminUsuarios')[0].classList.remove("active", "font-weight-bold", "btn-outline-secondary");
      document.getElementsByName('adminUsuarios')[0].classList.add("btn-secondary");
    }
  }
}
