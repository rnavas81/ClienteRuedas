import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnirseRuedaComponent } from './unirse-rueda.component';

describe('UnirseRuedaComponent', () => {
  let component: UnirseRuedaComponent;
  let fixture: ComponentFixture<UnirseRuedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnirseRuedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnirseRuedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
