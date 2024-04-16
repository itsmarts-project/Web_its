import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private apiUrl = 'https://geoapoyosapi-46nub.ondigitalocean.app';

  constructor(private http: HttpClient, private authService: AuthService) { }

  guardarSolicitante(data: any, fotoSolicitante: File): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('fotoSolicitante', fotoSolicitante);

    const tokenObservable$ = of(this.authService.getToken());
    return tokenObservable$.pipe(
      mergeMap(token => {
        const headers = token ? { 'token': String(token) } : {};
        return this.http.post<any>(`${this.apiUrl}/solicitante/registrar`, formData, { headers });
      })
    );
  }
}
