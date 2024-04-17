import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Logradouro } from '@app/models/Logradouro';
import { LogradouroService } from '@app/services/logradouro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logradouro-detalhes',
  templateUrl: './logradouro-detalhes.component.html',
  styleUrls: ['./logradouro-detalhes.component.scss'],
})
export class LogradouroDetalhesComponent {
  public logradouro: Logradouro;
  public form: FormGroup;
  modoSalvar = 'post';

  constructor(
    private fb: FormBuilder,
    private logradouroService: LogradouroService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  get f(): any {
    return this.form.controls;
  }

  get modoEditar(): boolean {
    return this.modoSalvar === 'put';
  }

  public cssValidator(campoValidacao: FormControl | AbstractControl): any {
    return { 'is-invalid': campoValidacao.errors && campoValidacao.touched };
  }

  public ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.form = this.fb.group({
      endereco: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  salvarEndereco(): void {
    const endereco = {
      id: this.form.value.id,
      endereco: this.form.value.endereco,
    };

    this.logradouroService.salvarEndereco(endereco).subscribe({
      next: (response: any) => {
        console.log(response);
        this.spinner.hide();
        this.toastr.success('Endereço salvo com sucesso!');
        this.router.navigate(['/logradouro/lista']);
      },
      error: (error: any) => {
        console.error('Erro ao salvar endereço', error);
      },
    });
  }

  public resetForm(): void {
    this.router.navigate([`logradouro/lista/`]);
  }
}
