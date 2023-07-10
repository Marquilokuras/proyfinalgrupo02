import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor(private http: HttpClient) { }

  getCurrencyValue(monedaOrigen: string, monedaDestino: string): Observable<any> {
    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${monedaOrigen}/${monedaDestino}.json`;
    return this.http.get(url);
  }

  getAll(): Observable<any> {
    const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.json`;
    return this.http.get(url);
  }
}
