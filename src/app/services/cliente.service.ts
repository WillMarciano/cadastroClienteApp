import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '@app/models/Cliente';
import { environment } from '@environments/environment';
import { Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  baseUrl = environment.apiURL + 'api/v1/cliente';

  constructor(private http: HttpClient) { }

  public getCliente(): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/buscar`).pipe(take(1));    
  }

  public postUpload(file: File): Observable<any> {
    const fileToUpload = file[0] as File;
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.baseUrl}/upload`, formData).pipe(take(1));
  }
}
