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

  public buscar(): Observable<Logradouro[]> {
    return this.http.get<Logradouro[]>(`${this.baseUrl}/buscar`).pipe(take(1));
  }

  public

  public buscarPorId(id: number): Observable<Logradouro> {
    return this.http.get<Logradouro>(`${this.baseUrl}/buscar/${id}`).pipe(take(1));
  }

  public salvar(logradouro: Logradouro): Observable<Logradouro> {
    return this.http.post<Logradouro>(`${this.baseUrl}/salvar`, logradouro).pipe(take(1));
  }
  public deletar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deletar/${id}`).pipe(take(1));
  }

  
}