import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaRuedasComponent } from './lista-ruedas.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RuedaService } from 'src/app/services/rueda.service';
import { UsersService } from 'src/app/services/users.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { faPencilAlt, faTrash, faPlusSquare, faPlus} from '@fortawesome/free-solid-svg-icons';
import { CabeceraComponent } from 'src/app/components/vistaRueda/cabecera/cabecera.component';
import { ToastComponent } from "src/app/components/toast/toast.component";
import { FaIconComponent } from '@fortawesome/angular-fontawesome';


describe('Test de Rodrigo para el componente lista de ruedas', () => {
  let component: ListaRuedasComponent;
  let fixture: ComponentFixture<ListaRuedasComponent>;

  beforeAll(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRuedasComponent,CabeceraComponent,ToastComponent,FaIconComponent ],
      imports: [
        FormsModule, ReactiveFormsModule,HttpClientTestingModule,RouterTestingModule
      ],
      providers: [
        UsersService,RuedaService
      ]
    });
  });
  beforeAll(()=> {
    fixture = TestBed.createComponent(ListaRuedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.faPencil = faPencilAlt;
    component.faTrash = faTrash;
    component.faAddSquare = faPlusSquare;
    component.faPlus = faPlus;

  })
  beforeEach(()=> {
    component.ruedas = [
      {
        id: 1,
        nombre: 'IFP Virgen de Gracia',
        descripcion: 'Las viajes de ida salen 30 minutos antes',
        origen: 'Ciudad Real',
        destino: 'IFP Virgen de Gracia',
        salidas: [
          { id: 1, id_rueda: 1, nombre: 'Puerta de Toledo' },
          { id: 2, id_rueda: 1, nombre: 'Rotonda del helicoptero' },
        ],
      },
      {
        id: 2,
        nombre: 'IFP Virgen de Gracia',
        descripcion: 'Las viajes de ida salen 30 minutos antes',
        origen: 'Miguelturra',
        destino: 'IFP Virgen de Gracia',
        salidas: [
          { id: 1, id_rueda: 1, nombre: 'Torre Gorda' },
        ],
      },
    ];

  })
  describe('Comprueba la posición de una rueda', () => {
    it('Si busco la rueda con id 2 me devuelve la posición 1. Si busco la rueda con id 3 me devuelve la posición -1', () => {
      let id = 2, result= 1;
      expect(component.buscarRuedaById(id)).toBe(result);
      id = 3, result = -1
      expect(component.buscarRuedaById(id)).toBe(result);
    });
  })
  it('Si cancelo el formulario de rueda los campos quedan vacíos', () => {
    component.onCancel();
    expect(component.formularioModal.controls['id'].value).toBe('');
    expect(component.formularioModal.controls['nombre'].value).toBe('');
    expect(component.formularioModal.controls['descripcion'].value).toBe('');
    expect(component.formularioModal.controls['origen'].value).toBe('');
  });
  it('Si edito la rueda 2 los campos del modal se rellenan con los datos', () => {
    component.editar(2);
    expect(component.formularioModal.controls['id'].value).toBe(2);
    expect(component.formularioModal.controls['nombre'].value).toBe('IFP Virgen de Gracia');
    expect(component.formularioModal.controls['descripcion'].value).toBe('Las viajes de ida salen 30 minutos antes');
    expect(component.formularioModal.controls['origen'].value).toBe('Miguelturra');
  });
});
