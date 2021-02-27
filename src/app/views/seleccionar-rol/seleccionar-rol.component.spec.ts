import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarRolComponent } from './seleccionar-rol.component';

describe('SeleccionarRolComponent', () => {
  let component: SeleccionarRolComponent;
  let fixture: ComponentFixture<SeleccionarRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeleccionarRolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeleccionarRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
