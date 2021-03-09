import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PanelAdministradorComponent } from './panel-administrador.component';
import { UsersService } from 'src/app/services/users.service';
import { AdministradorService } from 'src/app/services/administrador.service';
import { CabeceraComponent } from 'src/app/components/vistaRueda/cabecera/cabecera.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { ToastComponent } from 'src/app/components/toast/toast.component';

describe('Test de Alejandro para el componente panel de Administrador', () => {
  let component: PanelAdministradorComponent;
  let fixture: ComponentFixture<PanelAdministradorComponent>;

  beforeAll(async () => {
    await TestBed.configureTestingModule({
      declarations: [PanelAdministradorComponent, CabeceraComponent, FaIconComponent, ToastComponent],
      imports: [
        FormsModule, ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule
      ],
      providers: [
        UsersService, AdministradorService
      ]
    })
      .compileComponents();
  });

  beforeAll(() => {
    fixture = TestBed.createComponent(PanelAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    var n = Date.now();
    component.usuarios = [
      {
        id: n + 1,
        name: 'Pepe',
        surname: 'López',
        email: 'pepe@gmail.com',
        password: '1234',
        rol: 'Administrador'
      },
      {
        id: n + 2,
        name: 'Juan',
        surname: 'Rodriguez',
        email: 'juan@gmail.com',
        password: '1234',
        rol: 'Usuario'
      },
      {
        id: n + 3,
        name: 'Arturo',
        surname: 'Fernández',
        email: 'arturo@gmail.com',
        password: '1234',
        rol: 'Administrador'
      }
    ]
  });



  describe('Contenido del formulario editar correcto', () => {
    it('Si edito un usuario, los campos deben contener los valores correctos', () => {
      component.editUser(0);

      expect(component.editForm.controls['editName'].value).toBe('Pepe');
      expect(component.editForm.controls['editSurname'].value).toBe('López');
      expect(component.editForm.controls['editEmail'].value).toBe('pepe@gmail.com');
      expect(component.editForm.controls['editRol'].value).toBe('Administrador');
    });
  });

  describe('Comprobar Rol', () => {
    it('Si un usuario tiene el rol de Administrador, tiene que tener rol 1', () => {
      expect(component.comprobarRol('Administrador')).toBe(1);
    });

    it('Si un usuario tiene el rol de Usuario, tiene que tener rol 2', () => {
      expect(component.comprobarRol('Usuario')).toBe(2);
    });
  });

  describe('Contenido del formulario añadir usuario vacío', () => {
    it('Si abro el formulario, tiene que tener los campos vacios', () => {

      expect(component.registroForm.controls['name'].value).toBe('');
      expect(component.registroForm.controls['surname'].value).toBe('');
      expect(component.registroForm.controls['email'].value).toBe('');
      expect(component.registroForm.controls['password'].value).toBe('');
      expect(component.registroForm.controls['rol'].value).toBe('');
    });
  });
  
});