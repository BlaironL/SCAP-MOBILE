import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  createOutline, 
  calendarOutline, 
  locationOutline, 
  listOutline, 
  saveOutline, 
  closeOutline,
  checkmarkCircleOutline, 
  closeCircleOutline      
} from 'ionicons/icons';

// Imports Standalone Específicos
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonMenuButton, IonTitle, 
  IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonModal,
  IonSegment, IonSegmentButton, IonInput, IonTextarea, IonToggle, IonBadge
} from '@ionic/angular/standalone';

import { ScapDataService, Evento, Projeto } from '../../services/scap-data.service';

@Component({
  selector: 'app-gerenciar-eventos',
  templateUrl: './gerenciar-eventos.page.html', // <--- CORREÇÃO 1: Aponta para o arquivo certo
  styleUrls: ['./gerenciar-eventos.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonMenuButton, IonTitle, 
    IonContent, IonList, IonItem, IonLabel, IonButton, IonIcon, IonModal,
    IonSegment, IonSegmentButton, IonInput, IonTextarea, IonToggle, IonBadge
  ]
})
export class GerenciarEventosPage implements OnInit { // <--- CORREÇÃO 2: Nome da classe correto
  private scapService = inject(ScapDataService);
  private toastCtrl = inject(ToastController);
  private alertCtrl = inject(AlertController); 

  // Listas de Dados
  meusEventos: Evento[] = [];
  todosProjetos: Projeto[] = []; 
  
  // Controle do Modal
  isModalOpen = false;
  segmentoSelecionado = 'detalhes';
  
  // Dados para edição/visualização no Modal
  eventoSelecionado: Evento | null = null;
  projetosDoEvento: Projeto[] = [];

  constructor() {
    addIcons({ 
      createOutline, calendarOutline, locationOutline, listOutline, 
      saveOutline, closeOutline, checkmarkCircleOutline, closeCircleOutline 
    });
  }

  ngOnInit() {
    this.scapService.eventos$.subscribe(eventos => {
      this.meusEventos = eventos;
    });

    this.scapService.projetos$.subscribe(projetos => {
      this.todosProjetos = projetos;
      // Atualiza em tempo real se o modal estiver aberto
      if (this.eventoSelecionado && this.isModalOpen) {
        this.filtrarProjetos(this.eventoSelecionado);
      }
    });
  }

  // Forçar atualização ao entrar na tela
  ionViewWillEnter() {
    this.scapService.atualizarDados();
  }

  abrirGerenciamento(evento: Evento) {
    this.eventoSelecionado = { ...evento };
    this.segmentoSelecionado = 'detalhes';
    
    this.filtrarProjetos(evento);

    this.isModalOpen = true;
  }

  // Método auxiliar para evitar erros de tipo (String vs Number)
  private filtrarProjetos(evento: Evento) {
    // Usa '==' para permitir que ID 5 (number) seja igual a "5" (string)
    this.projetosDoEvento = this.todosProjetos.filter(p => p.eventoId == evento.id);
  }

  fecharModal() {
    this.isModalOpen = false;
    this.eventoSelecionado = null;
  }

  trocarSegmento(event: any) {
    this.segmentoSelecionado = event.detail.value;
  }

  async salvarAlteracoes() {
    if (this.eventoSelecionado) {
      this.scapService.atualizarEvento(this.eventoSelecionado).subscribe({
        next: async () => {
          const toast = await this.toastCtrl.create({
            message: 'Evento atualizado com sucesso!',
            duration: 2000,
            color: 'success',
            position: 'top',
            icon: 'save-outline'
          });
          toast.present();
          this.fecharModal();
        },
        error: async (err) => {
          console.error(err);
          const toast = await this.toastCtrl.create({
            message: 'Erro ao atualizar evento.',
            duration: 2000,
            color: 'danger',
            position: 'top'
          });
          toast.present();
        }
      });
    }
  }

  async confirmarAcaoProjeto(projeto: Projeto, acao: 'aprovar' | 'recusar') {
    const isAprovar = acao === 'aprovar';
    const novoStatus = isAprovar ? 'Em Avaliação' : 'Recusado';
    const header = isAprovar ? 'Aceitar Projeto?' : 'Recusar Projeto?';
    const msg = isAprovar 
      ? `Deseja aceitar o projeto "${projeto.titulo}" para avaliação?`
      : `Deseja recusar o projeto "${projeto.titulo}"?`;

    const alert = await this.alertCtrl.create({
      header: header,
      message: msg,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          role: isAprovar ? 'confirm' : 'destructive',
          handler: () => {
            this.executarAlteracaoStatus(projeto, novoStatus);
          }
        }
      ]
    });

    await alert.present();
  }

  private executarAlteracaoStatus(projeto: Projeto, novoStatus: string) {
    this.scapService.atualizarStatusProjeto(projeto.id, novoStatus).subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: `Projeto ${novoStatus === 'Recusado' ? 'recusado' : 'aceito'} com sucesso!`,
          duration: 2000,
          color: novoStatus === 'Recusado' ? 'warning' : 'success',
          position: 'top'
        });
        toast.present();
      },
      error: async () => {
        const toast = await this.toastCtrl.create({
          message: 'Erro ao atualizar status.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}