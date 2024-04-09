import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroCandidatosComponent } from './registro-candidatos.component';

describe('RegistroCandidatosComponent', () => {
  let component: RegistroCandidatosComponent;
  let fixture: ComponentFixture<RegistroCandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroCandidatosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
