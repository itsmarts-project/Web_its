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
    this.authService.getRolUsuario(this.correo)
      .subscribe(
        (response) => {
          const { rol, idUsuario } = response;
          this.authService.login(this.correo, this.contrasenia, idUsuario)
            .subscribe(
              (_response) => {
                console.log('Inicio de sesión exitoso');
                this.obtenerRolUsuario(rol);
              },
              (_error) => {
                console.log('Error al iniciar sesión', _error);
              }
            );
        },
        (error) => {
          console.log('Error al obtener el rol del usuario', error);
        }
      );
  }

  obtenerRolUsuario(rol: string): void {
    if (rol === 'AD') {
      this.router.navigate(['/menu-admin']);
    } else if (rol === 'CA') {
      this.router.navigate(['/menu-capturador']);
    }
  }
}
