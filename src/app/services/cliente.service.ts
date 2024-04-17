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
    return this.http.get<Cliente>(`${this.baseUrl}/buscarCliente`).pipe(take(1));
  }

  buscarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.baseUrl}/buscarClientes`).pipe(take(1));
  }

  atualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/atualizarCliente`, cliente).pipe(take(1));
  }

  salvarLogotipoCliente(cliente: Cliente, file: File): Observable<Cliente> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cliente', JSON.stringify(cliente));
    return this.http.post<Cliente>(`${this.baseUrl}/salvarLogotipoCliente`, formData).pipe(take(1));
  }

  UploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<string>(`${this.baseUrl}/uploadFile`, formData).pipe(take(1));
  }
}
