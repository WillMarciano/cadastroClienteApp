import { Cliente } from '@app/models/Cliente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  baseUrl = environment.apiURL + 'api/v1/cliente';

  constructor(private http: HttpClient) {}

  buscarCliente(cliente: Cliente): Observable<Cliente> {
    console.log('Buscando cliente', cliente);
    console.log('URL', `${this.baseUrl}/buscarCliente`);
    return this.http.get<Cliente>(`${this.baseUrl}/buscarCliente`).pipe(take(1));
  }

  buscarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/buscarClientes`).pipe(take(1));
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/atualizarCliente`, cliente).pipe(take(1));
  }
}
