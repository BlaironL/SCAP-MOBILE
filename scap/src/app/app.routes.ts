import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // <--- MUDAMOS AQUI
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
  // ... (Suas outras rotas dashboard, criar-evento, etc. continuam aqui)
  {
    path: 'dashboard',
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
];