import { Resultado } from './resultado/resultado';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

interface CalculoResponse {
  resultado: number;
}
@Injectable({
  providedIn: 'root',
})
export class CalculoService {
  private resultado: number =0;
  private tortalMlEmbalagem: number =0;
  constructor(private http: HttpClient) {}

   calcularResultado(embalagem: number, unidades: number, hectolitros: number): Observable<CalculoResponse> {
    this.tortalMlEmbalagem = embalagem * unidades;
    this.resultado =Math.round((hectolitros * 100000) / this.tortalMlEmbalagem);
    return of({ resultado: this.resultado });
  }
}
