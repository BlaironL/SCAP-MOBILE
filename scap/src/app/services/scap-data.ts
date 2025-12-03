import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Evento {
  id: string;
  codigo: string; // O Token único
  titulo: string;
  local: string;
  data: string;
  descricao: string;
  privado: boolean; // Público ou Privado
  organizadores: string[]; // E-mails dos convidados
  status: 'Aberto' | 'Encerrado';
}

export interface Projeto {
  id: string;
  eventoId: string;
  eventoNome: string;
  titulo: string;
  autor: string;
  resumo: string;
  status: 'Pendente' | 'Em Avaliação' | 'Avaliado' | 'Recusado'; // Status do fluxo
  nota?: number;
}

export interface Notificacao {
  id: string;
  tipo: 'solicitacao_projeto';
  mensagem: string;
  projetoId: string; // Para saber qual projeto aprovar
  lida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScapDataService {

  // --- DADOS INICIAIS (MOCK) ---
  private _eventos = new BehaviorSubject<Evento[]>([
    {
      id: '1',
      codigo: 'TEC2025',
      titulo: 'Semana de Tecnologia',
      local: 'Auditório A',
      data: '2025-11-20',
      descricao: 'Evento de tecnologia.',
      privado: false,
      organizadores: ['admin@scap.com'],
      status: 'Aberto'
    }
  ]);

  private _projetos = new BehaviorSubject<Projeto[]>([]);
  private _notificacoes = new BehaviorSubject<Notificacao[]>([]);

  constructor() {}

  // --- GETTERS (Observables) ---
  get eventos$() { return this._eventos.asObservable(); }
  get projetos$() { return this._projetos.asObservable(); }
  get notificacoes$() { return this._notificacoes.asObservable(); }

  // --- LÓGICA DO ORGANIZADOR ---

  criarEvento(evento: Evento) {
    const atual = this._eventos.value;
    this._eventos.next([evento, ...atual]);
  }

  gerarCodigoUnico(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // --- LÓGICA DO ALUNO ---

  buscarEvento(termo: string): Evento | undefined {
    // Busca por Código (Token) ou Título
    return this._eventos.value.find(e => 
      e.codigo.toUpperCase() === termo.toUpperCase() || 
      e.titulo.toLowerCase().includes(termo.toLowerCase())
    );
  }

  submeterProjeto(projeto: Projeto, evento: Evento) {
    // Regra de Negócio:
    // Se evento for PRIVADO -> Status 'Pendente' + Notificação pro dono
    // Se evento for PÚBLICO -> Status 'Em Avaliação' direto
    
    if (evento.privado) {
      projeto.status = 'Pendente';
      this.criarNotificacao(projeto, evento);
    } else {
      projeto.status = 'Em Avaliação';
    }

    const atual = this._projetos.value;
    this._projetos.next([projeto, ...atual]);
  }

  // --- LÓGICA DE NOTIFICAÇÃO ---

  private criarNotificacao(projeto: Projeto, evento: Evento) {
    const novaNotificacao: Notificacao = {
      id: Date.now().toString(),
      tipo: 'solicitacao_projeto',
      mensagem: `Novo projeto "${projeto.titulo}" submetido para o evento "${evento.titulo}".`,
      projetoId: projeto.id,
      lida: false
    };
    const atual = this._notificacoes.value;
    this._notificacoes.next([novaNotificacao, ...atual]);
  }

  responderSolicitacao(notificacao: Notificacao, aceitar: boolean) {
    // Atualiza o status do projeto
    const projetosAtualizados = this._projetos.value.map(p => {
      if (p.id === notificacao.projetoId) {
        return { ...p, status: aceitar ? 'Em Avaliação' : 'Recusado' };
      }
      return p;
    });
    
    // @ts-ignore
    this._projetos.next(projetosAtualizados);

    // Remove a notificação
    const notificacoesRestantes = this._notificacoes.value.filter(n => n.id !== notificacao.id);
    this._notificacoes.next(notificacoesRestantes);
  }
}