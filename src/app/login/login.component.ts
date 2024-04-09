import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string;
  contrasenia: string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.authService.login(this.correo, this.contrasenia)
      .subscribe(
        (_response_) => {
          console.log('Inicio de sesión exitoso');
          this.obtenerRolUsuario();
        },
        (_error_) => {
          console.log('Error al iniciar sesión', _error_);
        }
      );
  }

  obtenerRolUsuario(): void {
    this.authService.getRolUsuario(this.correo)
      .subscribe(
        (response) => {
          const rol = response.rol; // Asume que el rol viene en la respuesta del API
          if (rol === 'AD') {
            this.router.navigate(['/menu-admin']);
          } else if (rol === 'CA') {
            this.router.navigate(['/menu-capturador']);
          }
        },
        (error) => {
          console.log('Error al obtener el rol del usuario', error);
        }
      );
  }
}