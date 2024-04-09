import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstatusVisitaComponent } from './estatus-visita.component';

describe('EstatusVisitaComponent', () => {
  let component: EstatusVisitaComponent;
  let fixture: ComponentFixture<EstatusVisitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstatusVisitaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstatusVisitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
