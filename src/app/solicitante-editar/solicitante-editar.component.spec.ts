import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteEditarComponent } from './solicitante-editar.component';

describe('SolicitanteEditarComponent', () => {
  let component: SolicitanteEditarComponent;
  let fixture: ComponentFixture<SolicitanteEditarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitanteEditarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitanteEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
