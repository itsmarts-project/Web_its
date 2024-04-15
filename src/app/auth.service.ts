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
  private userInfoSubject = new BehaviorSubject<{ rol: string, idUsuario: string, nombre: string, primerApellido: string, segundoApellido: string } | null>(null);

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.tokenSubject.next(token);
    }

    const userInfo = this.getUserInfoFromLocalStorage();
    if (userInfo) {
      this.userInfoSubject.next(userInfo);
    }
  }

  getUserInfo(): Observable<{ rol: string, idUsuario: string, nombre: string, primerApellido: string, segundoApellido: string } | null> {
    return this.userInfoSubject.asObservable();
  }

  getRolUsuario(correo: string): Observable<any> {
    const body = { correo };
    return this.http.post('http://localhost:8080/usuario/traerRolUsuario', body)
      .pipe(
        map((response: any) => {
          const userInfo = {
            rol: response.usuario.puesto,
            idUsuario: response.usuario.idUsuario,
            nombre: response.usuario.nombre,
            primerApellido: response.usuario.primerApellido,
            segundoApellido: response.usuario.segundoApellido
          };
          this.userInfoSubject.next(userInfo);
          this.storeUserInfoInLocalStorage(userInfo);
          return userInfo;
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
          localStorage.setItem('token', token);
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

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
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

  private getUserInfoFromLocalStorage(): { rol: string, idUsuario: string, nombre: string, primerApellido: string, segundoApellido: string } | null {
    const userInfoString = localStorage.getItem('userInfo');
    return userInfoString ? JSON.parse(userInfoString) : null;
  }

  private storeUserInfoInLocalStorage(userInfo: { rol: string, idUsuario: string, nombre: string, primerApellido: string, segundoApellido: string }): void {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }
}
