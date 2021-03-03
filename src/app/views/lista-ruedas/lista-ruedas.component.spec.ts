import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRuedasComponent } from './lista-ruedas.component';

describe('ListaRuedasComponent', () => {
  let component: ListaRuedasComponent;
  let fixture: ComponentFixture<ListaRuedasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRuedasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaRuedasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
