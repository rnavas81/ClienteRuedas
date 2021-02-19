import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RuedaHorarioComponent } from './rueda-horario.component';

describe('RuedaHorarioComponent', () => {
  let component: RuedaHorarioComponent;
  let fixture: ComponentFixture<RuedaHorarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RuedaHorarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RuedaHorarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
