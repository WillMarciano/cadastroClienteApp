import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxCurrencyDirective } from 'ngx-currency';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { RegistrarComponent } from './components/usuario/registrar/registrar.component';

import { NavComponent } from './shared/nav/nav.component';

import { AccountService } from './services/account.service';

import { TituloComponent } from './shared/titulo/titulo.component';

import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { HomeComponent } from './components/home/home.component';

import { JwtModule } from '@auth0/angular-jwt';
import { LoginComponent } from './components/usuario/login/login.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ClienteListaComponent } from './components/clientes/cliente-lista/cliente-lista.component';
import { ClienteDetalheComponent } from './components/clientes/cliente-detalhe/cliente-detalhe.component';
import { LogradourosComponent } from './components/logradouros/logradouros.component';
import { LogradouroListaComponent } from './components/logradouros/logradouro-lista/logradouro-lista.component';
import { LogradouroDetalhesComponent } from './components/logradouros/logradouro-detalhes/logradouro-detalhes.component';



defineLocale('pt-br', ptBrLocale);

export function tokenGetter() {
  return localStorage.getItem('user');
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TituloComponent,
    UsuarioComponent,
    LoginComponent,
    RegistrarComponent,
    HomeComponent,
    ClientesComponent,
    ClienteListaComponent,
    ClienteDetalheComponent,
    LogradourosComponent,
    LogradouroListaComponent,
    LogradouroDetalhesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    TooltipModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressBar: true,
    }),
    NgxSpinnerModule,
    NgxCurrencyDirective,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    AccountService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
