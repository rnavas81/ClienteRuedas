import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  constructor(private UsersService: UsersService, private router: Router) {
    var paso = this.UsersService.isLogged;
    console.log(paso);
    if (!this.UsersService.isLogged) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
  }

}
