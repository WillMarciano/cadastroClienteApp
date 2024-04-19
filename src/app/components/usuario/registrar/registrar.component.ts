import { ValidatorField } from '@app/helpers/ValidatorField';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Component } from '@angular/core';
import { AccountService } from './../../../services/account.service';
import { Router } from '@angular/router';
import { User } from '@app/models/identity/User';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss'],
})
export class RegistrarComponent {
  user = {} as User;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }
  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.validation();
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(value);
  
    const passwordValid = hasUpperCase && hasLowerCase && hasSpecialCharacter;
  
    if (!passwordValid) {
      return { passwordStrength: 'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um caractere especial.' };
    }
  
    return null;
  }

  public validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmPassword'),
    };

    this.form = this.fb.group(
      {
        nome: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20), this.passwordValidator]],
        confirmPassword: ['', [Validators.required]],
      },
      formOptions
    );
  }

  register(): void {
    this.user = { ...this.form.value };
    this.accountService.register(this.user).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (error: any) => {
        this.toaster.error("Não foi possível realizar o cadastro", 'Erro');
      },
    });
  }
}
