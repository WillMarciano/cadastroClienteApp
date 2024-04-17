import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logradouro } from '@app/models/Logradouro';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogradouroService {
  baseUrl = environment.apiURL + 'api/v1/endereco';

  constructor(private http: HttpClient) { }

  buscarEnderecos(cliente: Logradouro): Observable<Logradouro> {
    console.log('Buscando enderecos', cliente);
    console.log('URL', `${this.baseUrl}/buscarEnderecos`);
    return this.http.get<Logradouro>(`${this.baseUrl}/buscarEnderecos`).pipe(take(1));
  }

  deletarEndereco(id: number): Observable<any> {
    console.log('Deletando enderecos', id);
    console.log('URL', `${this.baseUrl}/deletarEndereco/${id}`);
    return this.http.delete<any>(`${this.baseUrl}/deletarEndereco/`).pipe(take(1));
  }

  salvarEndereco(cliente: Logradouro): Observable<Logradouro> {
    console.log('Salvando enderecos', cliente);
    console.log('URL', `${this.baseUrl}/salvarEndereco`);
    return this.http.post<Logradouro>(`${this.baseUrl}/salvarEndereco`, cliente).pipe(take(1));
  }
}
