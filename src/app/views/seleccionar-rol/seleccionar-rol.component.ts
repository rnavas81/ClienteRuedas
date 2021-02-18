import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-seleccionar-rol',
  templateUrl: './seleccionar-rol.component.html',
  styleUrls: ['./seleccionar-rol.component.scss']
})
export class SeleccionarRolComponent implements OnInit {

  seleccionRol: FormGroup;
  entrarComo: string;

  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) {
    this.seleccionRol = this.formBuilder.group({
      entrarComo: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    document.getElementById('op_usuario').setAttribute("selected","selected");
  }

  entrar = () => {
    let datos = this.seleccionRol.value;
    switch (datos['entrarComo']) {      
      case 'Usuario':
        this.router.navigate(['/main']);
        break;
      case 'Administrador':
        this.router.navigate(['/administrador']);
        break;
    }
  }

  logout = () => {
    this.userService.logout();
  }

}
