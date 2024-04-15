import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent {
  constructor(private router: Router, private auth: AuthService){}

  navigateToRegistroCandidatos() {
    this.router.navigate(['/formulario-solicitud']);
  }

  navigateToEstatusVisita(){
    this.router.navigate(['/solicitantes']);
  }

  navigateToPermisosUsuario(){
    this.router.navigate(['/permisos-usuario']);
  }

  logOut(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
