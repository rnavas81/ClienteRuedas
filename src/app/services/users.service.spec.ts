import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientTestingModule,
  HttpTestingController } from '@angular/common/http/testing';

describe('Test de Jorge para el user service', () => {

  let service: UsersService;
  let http: HttpClient;
  let router: Router;
  let httpTestingController: HttpTestingController;

  let user;

  beforeEach(() => {
    service = new UsersService(http, router);
    user = {
      name:'test',
      surname:'test',
      email:'test@gmail.com',
      token:'testtoken'
    }
  });

  it('Si paso unos valores al servicio deberia de guardarlos correctamente', () => {
    service.set(user);
    expect(service.name).toBe('test');
    expect(service.surname).toBe('test');
    expect(service.email).toBe('test@gmail.com');
  });

  it('Si hacemos logout los campos del servicio estaran undefined', () => {
    service.set(user);
    service.resetVal();
    expect(service.name).toBe(undefined);
  });

  it('Comprobamos que el servicio tiene valores para ver si el usuario esta logeado', () => {
    service.set(user);
    console.log(service.name);

    expect(service.isLogged()).toBe(true);
  });

  it('Comprobamos que por defecto el usuario no esta loggeado', () => {
    service.set(user);
    service.resetVal();
    expect(service.isLogged()).toBe(false);
  });

  describe('Test de rol de usuario', () => {

    it('Comprobamos que si el usuario no tiene rol no puede pasar', () => {
      service.set(user);
      expect(service.isAdmin()).toBe(false);
    });

    it('Comprobamos que si el usuario no tiene el rol de adminsitrador no tiene acceso', () => {

      user = {
        name:'test',
        surname:'test',
        email:'test@gmail.com',
        token:'testtoken',
        rol:2
      }

      service.set(user);
      expect(service.isAdmin()).toBe(false);
    });

    it('Comprobamos que si el usuario tiene el rol de adminsitrador tiene acceso', () => {

      user = {
        name:'test',
        surname:'test',
        email:'test@gmail.com',
        token:'testtoken',
        rol:1
      }

      service.set(user);
      expect(service.isAdmin()).toBe(true);
    });
  });
});
