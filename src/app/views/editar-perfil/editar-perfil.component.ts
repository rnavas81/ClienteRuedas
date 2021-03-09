import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { environment, temas } from 'src/environments/environment';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  temas:any;
  seleccionado:string;

  constructor(private userService: UsersService,) {
    this.temas = temas;
    this.seleccionado='default';
  }

  ngOnInit(): void {
    if(localStorage.getItem(environment.LOCALSTORAGE_THEME)) {
      this.seleccionado = localStorage.getItem(environment.LOCALSTORAGE_THEME);
    }
  }

  cambiarTema = tema => {
    temas.forEach(item => {
      document.getElementsByTagName('body')[0].classList.remove(item.value);
    });
    if(tema=='default'){
      localStorage.removeItem(environment.LOCALSTORAGE_THEME);
    } else {
      localStorage.setItem(environment.LOCALSTORAGE_THEME,tema);
      document.getElementsByTagName('body')[0].classList.add(tema);
    }
  }

}
