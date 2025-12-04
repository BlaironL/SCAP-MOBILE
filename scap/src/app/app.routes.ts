import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'dashboard',
    // Se o seu dashboard estiver na raiz (src/app/dashboard), remova o "/pages" deste caminho.
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'criar-evento',
    loadComponent: () => import('./pages/criar-evento/criar-evento.page').then( m => m.CriarEventoPage)
  },
  {
    path: 'meus-projetos',
    loadComponent: () => import('./pages/meus-projetos/meus-projetos.page').then( m => m.MeusProjetosPage)
  },
  {
    path: 'avaliar',
    loadComponent: () => import('./pages/avaliar/avaliar.page').then( m => m.AvaliarPage)
  },
  {
    path: 'enviar-projeto',
    loadComponent: () => import('./pages/enviar-projeto/enviar-projeto.page').then( m => m.EnviarProjetoPage)
  },
  {
    path: 'gerenciar-eventos',
    loadComponent: () => import('./pages/gerenciar-eventos/gerenciar-eventos.page').then( m => m.GerenciarEventosPage)
  }
];