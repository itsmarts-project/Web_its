import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string  | null>(null);

  constructor(private http: HttpClient) { }

  login(correo:string, contrasenia:string):Observable<any> {
    const body = { correo, contrasenia };
    return this.http.post('http://localhost:8080/login', body)
    .pipe(
      tap((response:any)=>{
        const token = response.token;
        this.tokenSubject.next(token);
      })
    );
  }

  getToken(): Observable<string | null>{
    return this.tokenSubject.asObservable();
  }

  logout(): void{
    this.tokenSubject.next(null);
  }
}
