import { Router } from '@angular/router';
import { ClienteService } from './../../../services/cliente.service';
import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '@app/models/Cliente';
import { Logradouro } from '@app/models/Logradouro';
import { Pagination } from '@app/models/Pagination';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss'],
})
export class ClienteListaComponent {
  cliente: Cliente;
  modalRef?: BsModalRef;

  public clienteId = 0;

  public larguraImagem = 150;
  public margemImagem = 2;
  public exibirImagem = true;
  private filtroListado = '';

  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.carregarCliente();
  }

  public alterImage(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  private carregarCliente(): void {
    this.spinner.show();
    console.log(this.clienteId);
    this.clienteService.getCliente().subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        console.log(this.cliente);
        this.spinner.hide();
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error('Erro ao carregar os clientes', 'Erro');
      },
    });
  }

  detalheCliente(id: number): void {
    //ir para a tela cliente-detalhe-component
    this.router.navigate([`cliente/detalhe/${id}`]);
  }
}
