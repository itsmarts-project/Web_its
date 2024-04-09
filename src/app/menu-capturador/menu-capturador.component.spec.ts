import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCapturadorComponent } from './menu-capturador.component';

describe('MenuCapturadorComponent', () => {
  let component: MenuCapturadorComponent;
  let fixture: ComponentFixture<MenuCapturadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuCapturadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCapturadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
