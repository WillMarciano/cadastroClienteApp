import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logradouro } from '@app/models/Logradouro';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LogradouroService {
  baseUrl = environment.apiURL + 'api/v1/endereco';

  constructor(private http: HttpClient) {}

  buscarEndereco(id: number): Observable<Logradouro> {
    return this.http
      .get<Logradouro>(`${this.baseUrl}/buscarEndereco/${id}`)
      .pipe(take(1));
  }

  buscarEnderecos(): Observable<Logradouro[]> {    
    console.log('URL', `${this.baseUrl}/buscarEnderecos`);
    return this.http
      .get<Logradouro[]>(`${this.baseUrl}/buscarEnderecos`)
      .pipe(take(1));
  }

  deletarEndereco(id: number): Observable<any> {
    return this.http
      .delete<string>(`${this.baseUrl}/deletarEndereco/${id}`)
      .pipe(take(1));
  }

  salvarEndereco(endereco: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/SalvarEndereco`, endereco)
      .pipe(take(1));
  }
}
