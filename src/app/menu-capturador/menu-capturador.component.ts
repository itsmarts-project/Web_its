import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-capturador',
  templateUrl: './menu-capturador.component.html',
  styleUrls: ['./menu-capturador.component.css']
})
export class MenuCapturadorComponent {
  constructor(private router: Router, private auth: AuthService){}

  navigateToRegistroCandidatos() {
    this.router.navigate(['/formulario-solicitud']);
  }

  navigateToEstatusVisita(){
    this.router.navigate(['/solicitantes']);
  }

  logOut(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
