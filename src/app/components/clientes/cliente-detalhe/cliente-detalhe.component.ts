import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '@app/models/Cliente';
import { Logradouro } from '@app/models/Logradouro';
import { ClienteService } from '@app/services/cliente.service';
import { LogradouroService } from '@app/services/logradouro.service';
import { environment } from '@environments/environment';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss'],
})
export class ClienteDetalheComponent  {
  modalRef: BsModalRef;
  clienteId: number;
  cliente = {} as Cliente;
  form: FormGroup;
  modoSalvar = 'post';
  logradouroAtual = { id: 0, nome: '', indice: 0 };
  imagemUrl = 'assets/img/upload.png';
  file: File;

  get modoEditar(): boolean {
    return this.modoSalvar === 'put';
  }

  get logradouros(): FormArray {
    return this.form.get('logradouros') as FormArray;
  }

  get f(): any {
    return this.form.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD-MM-YYYY hh:mm A',
      containerClass: 'theme-default',
      isAnimated: true,
      showWeekNumbers: false,
    };
  }

  get bsConfigLogradouro(): any {
    return {
      adaptivePosition: true,
      dateInputFormat: 'DD-MM-YYYY',
      containerClass: 'theme-default',
      isAnimated: true,
      showWeekNumbers: false,
    };
  }

  constructor(
    private fb: FormBuilder,
    private localeService: BsLocaleService,
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private logradouroService: LogradouroService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    // private datePipe: DatePipe
  ) {
    this.localeService.use('pt-br');
  }

  ngOnInit() {
    this.carregarCliente();
    this.validation();
    }

  public validation(): void {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(50),
        ],
      ],
      logradouros: this.fb.array([]),
    });
  }

  public carregarCliente(): void {
    this.clienteId = +this.activatedRouter.snapshot.paramMap.get('id');

    if (this.clienteId !== null && this.clienteId !== 0) {
      this.spinner.show();

      this.modoSalvar = 'put';

      this.clienteService.getCliente().subscribe({
        next: (cliente: Cliente) => {
          this.cliente = { ...cliente };
          this.form.patchValue(this.cliente);
          console.log(this.cliente);
          // this.cliente.logradouros.forEach(lote =>{
          //   this.lotes.push(this.criarLote(lote));
          // })
          if (this.cliente.logotipo !== '') {
            this.imagemUrl =
              environment.apiURL + 'resources/images/logo.jpg';
          }
          this.carregarLogradouros();
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar o evento.', 'Erro');
          console.error(error);
        },
        complete: () => {
          this.spinner.hide();
        },
      });
    }
  }

  public carregarLogradouros(): void {
    this.logradouroService
      .buscar()
      .subscribe({
        next: (logradouros: Logradouro[]) => {
          logradouros.forEach((logradouro) => {
            this.logradouros.push(this.CriarLogradouro(logradouro));
          });
        },
        error: (error: any) => {
          this.toastr.error('Erro ao carregar logradouros', 'Erro');
          console.error(error);
        },
      });
    }


  public cssValidator(campoValidacao: FormControl | AbstractControl): any {
    return { 'is-invalid': campoValidacao.errors && campoValidacao.touched };
  }

  public resetForm(): void {
    this.form.reset();
  }

  public mudarValorData(value: Date, indice: number, campo: string): void {
    this.logradouros.value[indice][campo] = value;
  }

  public retornaTituloLogradouro(nome: string): string {
    return nome === null || nome === '' ? 'Nome do lote' : nome;
  }

  public adicionarLogradouro(): void {
    this.logradouros.push(this.CriarLogradouro({ id: 0 } as Logradouro));
  }

  CriarLogradouro(logradouro: Logradouro): FormGroup {
    return this.fb.group({
      id: [logradouro.id],
      nome: [logradouro.endereco, Validators.required],
    });
  }

  public salvarLogradouro(): void {
    if (this.form.controls['logradouros'].valid) {
      this.spinner.show();
      this.logradouroService.salvar(this.form.value).subscribe({
        next: () => {
          this.toastr.success('Logradouro salvo com sucesso!', 'Sucesso');
        },
        error: (error) => {
          this.toastr.error('Erro ao salvar Logradouro', 'Erro');
          console.error(error);
        },
        complete: () => {
          this.spinner.hide();
        },
      });
      }
    }

  public removerLogradouro(template: TemplateRef<any>, indice: number): void {
    this.logradouroAtual.id = this.logradouros.get(indice + '.id').value;
    this.logradouroAtual.nome = this.logradouros.get(indice + '.nome').value;
    this.logradouroAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    this.logradouros.removeAt(indice);
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.imagemUrl = event.target.result);

    this.file = ev.target.files;
    reader.readAsDataURL(this.file[0]);

    // this.uploadImagem();
  }

  uploadImagem(): void {
    this.spinner.show();
    this.clienteService
      .postUpload(this.file)
      .subscribe({
        next: () => {
          // this.carregarCliente();
          this.toastr.success('Imagem atualizada com sucesso', 'Sucesso');
        },
        error: (error: any) => {
          this.toastr.error('Erro ao fazer Upload de imagem', 'Erro');
          console.log(error);
        },
      })
      .add(() => this.spinner.hide());
  }

  public confirmDeleteLote(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.logradouroService
      .deletar(this.logradouroAtual.id)
      .subscribe({
        next: () => {
          this.toastr.success('O Logradouro foi deletado com Sucesso.', 'Deletado');
          this.logradouros.removeAt(this.logradouroAtual.indice);
        },
        error: (error: any) => {
          console.error(error);
          this.toastr.error(
            `Erro ao tentar deletar o evento ${this.logradouroAtual.id}`,
            'Erro'
          );
        },
      })
      .add(() => this.spinner.hide());
  }

  public declineDeleteLote(): void {
    this.modalRef.hide();
  }
}
