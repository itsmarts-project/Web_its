import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeocodingServiceService {

  private apiUrl = 'https://api.distancematrix.ai/maps/api/geocode/json';
  private apiKey = 'vaTczdWkbMuEiCPMV3vW1ZRusuqjAZF6qvFQtHfnDHBOSBGd74eE0snwLJvgwL37';

  constructor(private http: HttpClient) {}

  getLatLngFromAddress(address: string): Observable<{ lat: number; lng: number }> {
    const url = `${this.apiUrl}?address=${encodeURIComponent(address)}&key=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => {
        if (response.status === 'OK' && response.result.length > 0) {
          const { lat, lng } = response.result[0].geometry.location;
          return { lat, lng };
        }
        throw new Error('Dirección no encontrada');
      })
    );
  }
}
