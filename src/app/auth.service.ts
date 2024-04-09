import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
  private failedLoginAttempts: number = 0;
  private maxFailedAttempts: number = 5;

  constructor(private http: HttpClient) { }

  getRolUsuario(correo: string): Observable<any> {
    const body = { correo };
    return this.http.post('http://localhost:8080/usuarios/traerRolUsuario', body)
      .pipe(
        map((response: any) => {
          return {
            rol: response.rol,
            idUsuario: response.id
          };
        })
      );
  }

  login(correo: string, contrasenia: string, idUsuario: string): Observable<any> {
    const body = { correo, contrasenia };
    return this.http.post('http://localhost:8080/login', body)
      .pipe(
        tap((response: any) => {
          const token = response.token;
          this.tokenSubject.next(token);
          console.log(token)
        }),
        catchError((error) => {
          if (error.status === 401) {
            // Incrementar el contador de intentos fallidos
            this.failedLoginAttempts++;

            if (this.failedLoginAttempts >= this.maxFailedAttempts) {
              // Bloquear al usuario
              this.bloquearUsuario(idUsuario); // Pasamos el idUsuario aquí
            }
          }
          return throwError(error);
        })
      );
  }

  getToken(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  logout(): void {
    this.tokenSubject.next(null);
  }

  bloquearUsuario(idUsuario: string): void {
    const body = { idUsuario };
    this.http.post('http://localhost:8080/usuarios/bloquearUsuario', body)
      .subscribe(
        (response) => {
          console.log('Usuario bloqueado:', response);
          // Puedes realizar acciones adicionales si es necesario
        },
        (error) => {
          console.error('Error al bloquear usuario:', error);
          // Maneja el error de forma apropiada
        }
      );
  }
}
