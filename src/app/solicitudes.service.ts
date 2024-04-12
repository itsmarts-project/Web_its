import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http:HttpClient) { }

  guardarSolicitante(data:any, fotoSolicitante: File): Observable<any> {
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    formData.append('fotoSolicitante', fotoSolicitante);

    return this.http.post<any>(`${this.apiUrl}/solicitante/registrar`, formData);
  }
}
