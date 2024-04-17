import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { Logradouro } from '@app/models/Logradouro';
import { PaginatedResult } from '@app/models/Pagination';
import { LogradouroService } from '@app/services/logradouro.service';
import { environment } from '@environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-logradouro-lista',
  templateUrl: './logradouro-lista.component.html',
  styleUrls: ['./logradouro-lista.component.scss'],
})
export class LogradouroListaComponent {
  modalRef?: BsModalRef;
  public logradouro: Logradouro;
  public logradouros: Logradouro[] = [];
  public logradouroId = 0;

  public larguraImagem = 150;
  public margemImagem = 2;
  public exibirImagem = true;

  termoBuscaChanged: Subject<string> = new Subject<string>();

  public filtrarLogradouros(evt: any): void {
    this.termoBuscaChanged.next(evt.target.value);
  }

  constructor(
    private logradouroService: LogradouroService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.spinner.show();
    this.buscarCliente();
  }

  public alterImage(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public mostraImagem(imagemUrl: string): string {
    return imagemUrl !== ''
      ? `${environment.apiURL}resources/images/${imagemUrl}`
      : 'assets/img/semImagem.png';
  }

  public buscarCliente(): any {
    this.spinner.show();
    this.logradouroService
      .buscarEnderecos()
      .subscribe({
        next: (logradouros: Logradouro[]) => {
          this.logradouros = logradouros;
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error('Erro ao tentar carregar os logradouros', 'Erro');
        },
      })
      .add(() => this.spinner.hide());
  }

  openModal(
    event: any,
    template: TemplateRef<any>,
    logradouroId: number
  ): void {
    event.stopPropagation();
    this.logradouroId = logradouroId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();
    this.logradouroService
      .deletarEndereco(this.logradouroId)
      .subscribe({
        next: (result: any) => {
          if (result.message === 'Deletado') {
            this.toastr.success(
              'O endereço foi deletado com Sucesso.',
              'Excluido!'
            );
          }
          this.buscarCliente();
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o logradouro ${this.logradouroId}`,
            'Erro'
          );
        },
      })
      .add(() => this.spinner.hide());
  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheLogradouro(id: number): void {
    this.router.navigate([`logradouro/detalhe/${id}`]);
  }

  public pageChanged(event): void {
    this.buscarCliente();
  }
}
