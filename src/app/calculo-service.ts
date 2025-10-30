import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalculoService {
  private apiUrl = 'URL_DA_API';

  constructor(private http: HttpClient) {}

  calcularResultado(embalagem: string, unidades: number, hectolitros: number): Observable<any> {
    return this.http.post(this.apiUrl, {
      embalagem,
      unidades,
      hectolitros
    });
  }
}
