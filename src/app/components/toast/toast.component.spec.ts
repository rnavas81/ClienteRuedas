import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastComponent } from './toast.component';

describe('Test de Rodrigo para el componente toast', () => {
  let component : ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;
  beforeAll(async() => {
    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      imports: [

      ],
      providers: [
      ]
    });
  });
  beforeAll(()=> {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });
  beforeEach(()=> {
    component.toasts=[];
  })
  describe('Comprueba las clases', () => {
    it("Para un toast de tipo success devuelve las clases content rounded px-4 py-3 my-3 bg-success text-white. Para un toast sin tipo devuelve las clases content rounded px-4 py-3 my-3 bg-success text-white",() => {
      expect(component.getTypeClass('success')).toBe('content rounded px-4 py-3 my-3 bg-success text-white');
      expect(component.getTypeClass(null)).toBe('content rounded px-4 py-3 my-3 bg-primary text-white');
    })
  })
  describe('Comprueba la lista de toasts',() => {
    it("Si asigno un nuevo toasts hay 1 elemento",()=> {
      component.toast = {text:'Nuevo toast',type:'success'}
      expect(component.toasts.length).toBe(1);
    })
  })
});
