import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '@app/models/Cliente';
import { Logradouro } from '@app/models/Logradouro';
import { ClienteService } from '@app/services/cliente.service';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-lista',
  templateUrl: './cliente-lista.component.html',
  styleUrls: ['./cliente-lista.component.scss']
})
export class ClienteListaComponent {
  modalRef?: BsModalRef;
  public cliente : Cliente;
  public logradouros: Logradouro[] = [];
  public clienteId = 0;

  public larguraImagem = 150;
  public margemImagem = 2;
  public exibirImagem = true;
  
  constructor(
    private clienteService: ClienteService,
    private modalService: BsModalService,
    private toastr : ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.buscarCliente();
  }

  navegarParaLogradouros() {
    this.router.navigate([`logradouro/lista`]);
  }

  public alterImage(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public mostraImagem(imagemUrl: string): string {
    return imagemUrl !== ''
      ? `${environment.apiURL}resources/images/logo.jpg`
      : 'assets/img/semImagem.png';
  }

  public buscarCliente(): any {
    this.spinner.show();
    this.clienteService.buscarCliente(this.cliente).subscribe({
      next: (cliente: Cliente) => {
        this.cliente = cliente;
        this.spinner.hide();
        console.log('Cliente encontrado', cliente);
      },
      error: (error) => {
        this.spinner.hide();
        this.toastr.error('Erro ao buscar cliente', 'Erro');
      }
    });
  }

  openModal(event: any, template: TemplateRef<any>, clienteId: number): void {
    event.stopPropagation();
    this.clienteId = clienteId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  

  detalheCliente(id: number): void {
    this.router.navigate([`cliente/detalhe/${id}`]);
  }

  public pageChanged(event): void {
    this.buscarCliente();
  }       
}
