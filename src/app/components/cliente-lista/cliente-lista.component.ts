import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '@app/models/Cliente';
import { ClienteService } from '@app/services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent {
  public cliente : Cliente;
  
  constructor(
    private clienteService: ClienteService,
    private toastr : ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public buscarCliente(): void {
    this.spinner.show();
    this.clienteService.buscarCliente(this.cliente).subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error('Erro ao buscar cliente', 'Erro');
      }
    });
  }
            
}
