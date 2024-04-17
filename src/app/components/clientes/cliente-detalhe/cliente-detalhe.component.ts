import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '@app/models/Cliente';
import { ClienteService } from '@app/services/cliente.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cliente-detalhe',
  templateUrl: './cliente-detalhe.component.html',
  styleUrls: ['./cliente-detalhe.component.scss'],
})
export class ClienteDetalheComponent {
  form: FormGroup;
  logoImage: string;
  cliente: Cliente;
  clienteId: number;
  fileImage: File;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.carregarCliente();
    this.validation();
  }

  get f(): any {
    return this.form.controls;
  }

  public cssValidator(campoValidacao: FormControl | AbstractControl): any {
    return { 'is-invalid': campoValidacao.errors && campoValidacao.touched };
  }

  public validation(): void {
    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  public carregarCliente(): void {
    this.clienteId = +this.activatedRouter.snapshot.paramMap.get('id');
    this.spinner.show();
    this.clienteService.buscarCliente(this.cliente).subscribe({
      next: (cliente: Cliente) => {
        this.cliente = { ...cliente };
        this.form.patchValue(this.cliente);

        if (
          cliente.logotipo !== null &&
          cliente.logotipo !== '' &&
          cliente.logotipo !== undefined
        )
          this.logoImage = 'data:image/jpeg;base64,' + cliente.logotipo;
        else this.logoImage = 'data:image/jpeg;base64,' + 'assets/img/semimagem.png';



        this.spinner.hide();
      },
      error: (error: any) => {
        this.spinner.hide();
        this.toastr.error('Erro ao tentar carregar cliente');
      },
    });
  }
  private getBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
}
 
  salvarCliente(): void {
    if (this.form.invalid) {
      return;
    }
    this.spinner.show();

    this.cliente = { ...this.cliente, ...this.form.value };
    this.cliente.id = this.clienteId;

    this.spinner.show();
    this.clienteService
      .atualizarCliente(this.cliente)
      .subscribe({
        next: () => {
          this.spinner.hide();
          this.toastr.success('Dados do cliente atualizado', 'Sucesso!');
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar atualizar cliente');
        },
      })
      .add(() => this.spinner.hide());
  }

  voltar(): void {
    this.router.navigate(['/cliente/lista']);
  }

  public onFileChange(ev: any): void {
    const reader = new FileReader();

    reader.onload = (event: any) => (this.logoImage = event.target.result);

    this.fileImage = ev.target.files;
    reader.readAsDataURL(this.fileImage[0]);

    this.uploadImagem();
  }

  public uploadImagem(): void {
    if (this.fileImage === undefined) {
      return;
    }

    this.spinner.show();
    this.clienteService
      .UploadFile(this.fileImage[0])
      .subscribe({
        next: (result: any) => {
          if (result !== null && result !== '') {
            this.cliente.logotipo = result;
            this.toastr.success('Logotipo atualizado com sucesso', 'Sucesso!');
            this.carregarCliente();
          }
        },
        error: (error: any) => {
          this.toastr.error('Erro ao tentar atualizar logotipo');
        },
      })
      .add(() => this.spinner.hide());
  }
}
