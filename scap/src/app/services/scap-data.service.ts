import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { switchMap, tap, map, catchError } from 'rxjs/operators';
import { Capacitor } from '@capacitor/core';
import { AuthService } from './auth.service';

const isAndroid = Capacitor.getPlatform() === 'android';
const API_URL = isAndroid ? 'http://10.0.2.2:8000/api' : 'http://localhost:8000/api';

export interface Evento {
  id: string;
  codigo: string;
  titulo: string;
  local: string;
  data: string;
  descricao: string;
  privado: boolean;
  organizadores: string[]; 
  status: 'Aberto' | 'Encerrado';
  dono_nome?: string;
}

export interface Projeto {
  id: string;
  eventoId: string;
  eventoNome: string;
  titulo: string;
  autor: string;
  resumo: string;
  status: 'Pendente' | 'Em Avaliação' | 'Avaliado' | 'Recusado';
  notas?: {
    originalidade: number;
    relevancia: number;
    metodologia: number;
    apresentacao: number;
  };
  mediaFinal?: number;
  comentario?: string;
}

export interface Notificacao {
  id: string;
  tipo: 'solicitacao_projeto' | 'aviso';
  mensagem: string;
  projetoId?: string;
  lida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScapDataService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private _eventos = new BehaviorSubject<Evento[]>([]);
  private _projetos = new BehaviorSubject<Projeto[]>([]);
  private _notificacoes = new BehaviorSubject<Notificacao[]>([]);

  constructor() {
    this.atualizarDados();
  }

  get eventos$() { return this._eventos.asObservable(); }
  get projetos$() { return this._projetos.asObservable(); }
  get notificacoes$() { return this._notificacoes.asObservable(); }

  public async atualizarDados() {
    this.getAuthHeaders().pipe(
      switchMap(headers => this.http.get<any[]>(`${API_URL}/eventos/`, { headers }))
    ).subscribe(dados => {
      const adaptados = dados.map(e => ({ ...e, organizadores: [e.dono_nome] }));
      this._eventos.next(adaptados);
    });

    this.getAuthHeaders().pipe(
      switchMap(headers => this.http.get<any[]>(`${API_URL}/projetos/`, { headers }))
    ).subscribe(dados => {
      const adaptados = dados.map(p => ({ ...p, eventoId: p.evento }));
      this._projetos.next(adaptados);
    });
  }

  private getAuthHeaders(): Observable<HttpHeaders> {
    return from(this.authService.getToken()).pipe(
      map(token => {
        let headers = new HttpHeaders();
        if (token) {
          headers = headers.set('Authorization', `Bearer ${token}`);
        }
        return headers;
      })
    );
  }

  gerarCodigoUnico(): string {
    return ''; 
  }

  // --- AÇÕES: Retornam Observable agora ---

  criarEvento(evento: Partial<Evento>): Observable<Evento> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.post<Evento>(`${API_URL}/eventos/`, evento, { headers })),
      tap(() => this.atualizarDados()) // Atualiza lista local ao sucesso
    );
  }

  buscarEvento(codigo: string): Observable<Evento | null> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => 
        this.http.get<Evento>(`${API_URL}/eventos/buscar_por_codigo/?codigo=${codigo}`, { headers })
      ),
      catchError(() => of(null))
    );
  }

  submeterProjeto(projeto: Partial<Projeto>, evento: Evento): Observable<Projeto> {
    const payload = {
      ...projeto,
      evento: evento.id,
      // AJUSTE: Status sempre 'Pendente' para forçar a aprovação pelo dono do evento
      status: 'Pendente' 
    };

    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.post<Projeto>(`${API_URL}/projetos/`, payload, { headers })),
      tap(() => this.atualizarDados())
    );
  }

  avaliarProjeto(projetoId: string, notas: any, comentario: string) {
    const payload = {
      notas: notas,
      comentario: comentario,
      status: 'Avaliado'
    };

    this.getAuthHeaders().pipe(
      switchMap(headers => this.http.patch(`${API_URL}/projetos/${projetoId}/`, payload, { headers }))
    ).subscribe(() => this.atualizarDados());
  }

  // ADICIONADO: Método genérico para aprovar/recusar projetos
  atualizarStatusProjeto(projetoId: string, novoStatus: string): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.patch(`${API_URL}/projetos/${projetoId}/`, { status: novoStatus }, { headers })),
      tap(() => this.atualizarDados())
    );
  }

  atualizarEvento(evento: Evento): Observable<any> {
    return this.getAuthHeaders().pipe(
      switchMap(headers => this.http.patch(`${API_URL}/eventos/${evento.id}/`, evento, { headers })),
      tap(() => this.atualizarDados())
    );
  }

  // Notificações locais (mantidas simples)
  responderSolicitacao(notificacao: Notificacao, aceitar: boolean) {
    if (!notificacao.projetoId) return;
    const novoStatus = aceitar ? 'Em Avaliação' : 'Recusado';
    this.getAuthHeaders().pipe(
      switchMap(headers => this.http.patch(`${API_URL}/projetos/${notificacao.projetoId}/`, { status: novoStatus }, { headers }))
    ).subscribe(() => {
      this.atualizarDados();
      const atuais = this._notificacoes.value.filter(n => n.id !== notificacao.id);
      this._notificacoes.next(atuais);
    });
  }
}