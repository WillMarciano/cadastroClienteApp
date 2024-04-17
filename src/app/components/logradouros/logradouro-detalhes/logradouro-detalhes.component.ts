import { Logradouro } from './../../../models/Logradouro';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LogradouroService } from '@app/services/logradouro.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logradouro-detalhes',
  templateUrl: './logradouro-detalhes.component.html',
  styleUrls: ['./logradouro-detalhes.component.scss'],
})
export class LogradouroDetalhesComponent implements OnInit{
  logradouro: Logradouro;
  logradouroId: number;
  form: FormGroup;
  modoSalvar = 'post';

  constructor(
    private fb: FormBuilder,
    private logradouroService: LogradouroService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
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
    this.carregarEvento();
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

  public carregarEvento(): void{
    this.logradouroId = +this.activatedRouter.snapshot.paramMap.get('id');

    if (this.logradouroId !== null && this.logradouroId !== 0) {
      this.spinner.show();
      this.modoSalvar = 'put';
      this.logradouroService.buscarEndereco(this.logradouroId).subscribe({
        next: (logradouros: Logradouro) => {
          this.logradouro = { ...logradouros };
          this.form.patchValue(this.logradouro);
          this.spinner.hide();
        },
        error: (error: any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao tentar carregar logradouro');
          console.error(error);
        },
      });
    }
  }

  salvarEndereco(): void {
    const endereco = {
      id: this.form.value.id,
      endereco: this.form.value.endereco,
    };

    if (this.modoSalvar === 'put'){
      endereco.id = this.logradouroId;
    }


    this.logradouroService.salvarEndereco(endereco).subscribe({
      next: (response: any) => {
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
