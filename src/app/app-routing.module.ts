import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './guard/auth.guard';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { RegistrarComponent } from './components/usuario/registrar/registrar.component';
import { HomeComponent } from './components/home/home.component';
import { ClienteDetalheComponent } from './components/clientes/cliente-detalhe/cliente-detalhe.component';
import { ClienteListaComponent } from './components/clientes/cliente-lista/cliente-lista.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { LogradourosComponent } from './components/logradouros/logradouros.component';
import { LogradouroDetalhesComponent } from './components/logradouros/logradouro-detalhes/logradouro-detalhes.component';
import { LogradouroListaComponent } from './components/logradouros/logradouro-lista/logradouro-lista.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      { path: 'usuario', redirectTo: 'usuario/perfil' },
      { path: 'cliente', redirectTo: 'cliente/lista'},
      { path: 'logradouro', redirectTo: 'logradouro/lista'},
      {
        path: 'cliente',
        component: ClientesComponent,
        children: [
          { path: 'detalhe/:id', component: ClienteDetalheComponent },
          { path: 'detalhe', component: ClienteDetalheComponent },
          { path: 'lista', component: ClienteListaComponent },
        ],      
      },
      {
        path: 'logradouro',
        component: LogradourosComponent,
        children: [
          { path: 'detalhe/:id', component: LogradouroDetalhesComponent },
          { path: 'detalhe', component: LogradouroDetalhesComponent },
          { path: 'lista', component: LogradouroListaComponent },
        ],      
      }
    ],
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registrar', component: RegistrarComponent },
    ],
  },
  { path: 'home', component: HomeComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
