import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitanteTableComponent } from './solicitante-table.component';

describe('SolicitanteTableComponent', () => {
  let component: SolicitanteTableComponent;
  let fixture: ComponentFixture<SolicitanteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitanteTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolicitanteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
