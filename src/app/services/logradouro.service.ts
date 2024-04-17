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

  buscarEnderecos(): Observable<Logradouro[]> {    
    console.log('URL', `${this.baseUrl}/buscarEnderecos`);
    return this.http
      .get<Logradouro[]>(`${this.baseUrl}/buscarEnderecos`)
      .pipe(take(1));
  }

  deletarEndereco(id: number): Observable<any> {
    console.log('Deletando enderecos', id);
    console.log('URL', `${this.baseUrl}/deletarEndereco/${id}`);
    return this.http
      .delete<any>(`${this.baseUrl}/deletarEndereco/${id}`)
      .pipe(take(1));
  }

  // salvarEndereco(logradouro: Logradouro): Observable<Logradouro> {
  //   console.log('Salvando enderecos', logradouro);
  //   console.log('URL', `${this.baseUrl}/salvarEndereco`);
  //   return this.http.post<Logradouro>(`${this.baseUrl}/salvarEndereco`, logradouro).pipe(take(1));
  // }

  // public salvarEndereco(logradouro: Logradouro): Observable<Logradouro> {
  //   return this.http
  //     .post<Logradouro>(`${this.baseUrl}/salvarEndereco`, {} as Logradouro)
  //     .pipe(take(1));
  // }
  salvarEndereco(endereco: any): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/SalvarEndereco`, endereco)
      .pipe(take(1));
  }
}
