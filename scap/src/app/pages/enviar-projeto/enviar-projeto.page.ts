import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastController, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  searchOutline, 
  cloudUploadOutline, 
  businessOutline, 
  closeCircleOutline, 
  textOutline, 
  documentTextOutline 
} from 'ionicons/icons';

// Importações dos componentes Ionic Standalone
import { 
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, 
  IonContent, IonInput, IonButton, IonIcon, IonBadge, IonTextarea
} from '@ionic/angular/standalone';

// Importação do Serviço (Caminho Relativo)
import { ScapDataService, Evento } from '../../services/scap-data.service';

@Component({
  selector: 'app-enviar-projeto',
  templateUrl: './enviar-projeto.page.html',
  styleUrls: ['./enviar-projeto.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
    IonContent, IonInput, IonButton, IonIcon, IonBadge, IonTextarea
  ]
})
export class EnviarProjetoPage implements OnInit {

  termoBusca = '';
  eventoEncontrado: Evento | null = null;
  
  novoProjeto = {
    titulo: '',
    resumo: '',
    autor: 'Eu (Aluno)' // Em um app real, pegaria do usuário logado
  };

  constructor(
    private scapService: ScapDataService,
    private toastCtrl: ToastController,
    private navCtrl: NavController
  ) {
    addIcons({ searchOutline, cloudUploadOutline, businessOutline, closeCircleOutline, textOutline, documentTextOutline });
  }

  ngOnInit() { }

  buscarEvento() {
    if (!this.termoBusca.trim()) return;

    const evento = this.scapService.buscarEvento(this.termoBusca);
    
    if (evento) {
      this.eventoEncontrado = evento;
    } else {
      this.mostrarToast('Nenhum evento encontrado com este código ou nome.', 'warning');
      this.eventoEncontrado = null;
    }
  }

  limparBusca() {
    this.eventoEncontrado = null;
    this.termoBusca = '';
    this.novoProjeto = { titulo: '', resumo: '', autor: 'Eu (Aluno)' };
  }

  async enviar() {
    if (!this.eventoEncontrado) return;

    if (!this.novoProjeto.titulo || !this.novoProjeto.resumo) {
      this.mostrarToast('Preencha todos os campos do projeto.', 'warning');
      return;
    }

    const projeto = {
      id: Date.now().toString(),
      eventoId: this.eventoEncontrado.id,
      eventoNome: this.eventoEncontrado.titulo,
      titulo: this.novoProjeto.titulo,
      autor: this.novoProjeto.autor,
      resumo: this.novoProjeto.resumo,
      status: 'Pendente' as any 
    };

    this.scapService.submeterProjeto(projeto, this.eventoEncontrado);

    await this.mostrarToast('Projeto enviado com sucesso!', 'success');
    this.navCtrl.navigateBack('/meus-projetos');
  }

  async mostrarToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: color,
      position: 'top'
    });
    toast.present();
  }
}