import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VSignUpComponent } from './v-sign-up.component';

describe('VSignUpComponent', () => {
  let component: VSignUpComponent;
  let fixture: ComponentFixture<VSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
