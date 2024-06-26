import { AccountService } from './../../../services/account.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '@app/models/identity/UserLogin';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  model = {} as UserLogin;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService
  ) {}

  ngOnInit(): void {}

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: () => {
        this.router.navigateByUrl('/dashboard');
      },
      error: (error: any) => {
        if (error.status == 401)
          this.toaster.error('Usuário ou senha inválidos');
        else
          console.error(error);
      },
    });
  }  
}
