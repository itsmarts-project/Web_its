import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Importa MatSnackBar

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string;
  contrasenia: string;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) { }

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
                this.mostrarSnackBar('Error al iniciar sesión. Por favor, intente nuevamente.');
              }
            );
        },
        (error) => {
          console.log('Error al obtener el rol del usuario', error);
          this.mostrarSnackBar('Error al ingresar. Por favor, intente nuevamente.');
        }
      );
  }

  obtenerRolUsuario(rol: string): void {
    if (rol === 'AD') {
      this.router.navigate(['/menu-admin']);
    } else if (rol === 'CA') {
      this.router.navigate(['/menu-capturador']);
    } else if (rol === 'VI'){
      this.mostrarSnackBar('Acceso denegado');
    }
  }

  mostrarSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // Duración en milisegundos
      horizontalPosition: 'center', // Posición horizontal
      verticalPosition: 'top', // Posición vertical
      panelClass: ['error-snackbar'] // Clase CSS adicional para personalizar el estilo
    });
  }
}
