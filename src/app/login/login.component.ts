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
        (response) => {
          console.log('Inicio de sesión exitoso');
          this.router.navigateByUrl('/menu', { replaceUrl: true });
        },
        (error) => {
          console.log('Error al iniciar sesión', error);
        }
      );
  }
}