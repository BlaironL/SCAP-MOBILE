import { Component, OnInit, inject, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { 
  searchOutline, cloudUploadOutline, businessOutline, closeCircleOutline, 
  textOutline, documentTextOutline, locationOutline, sendOutline, arrowBackOutline 
} from 'ionicons/icons';
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonMenuButton, IonTitle, 
  IonContent, IonInput, IonButton, IonIcon, IonBadge, IonTextarea,
  IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonItem, IonLabel
} from '@ionic/angular/standalone';
import { ScapDataService, Evento, Projeto } from '../../services/scap-data.service';

@Component({
  selector: 'app-enviar-projeto',
  templateUrl: './enviar-projeto.page.html',
  styleUrls: ['./enviar-projeto.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonMenuButton, IonTitle,
    IonContent, IonInput, IonButton, IonIcon, IonBadge, IonTextarea,
    IonSearchbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
    IonCardContent, IonItem, IonLabel
  ]
})
export class EnviarProjetoPage implements OnInit {
  private scapService = inject(ScapDataService);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);
  private router = inject(Router);
  private ngZone = inject(NgZone);

  termoBusca = '';
  eventoEncontrado: Evento | null = null;
  
  // Autor é apenas visual aqui, o backend sobrescreve com o usuário logado
  novoProjeto = { titulo: '', resumo: '', autor: 'Aluno' }; 

  constructor() {
    addIcons({ 
      searchOutline, cloudUploadOutline, businessOutline, closeCircleOutline, 
      textOutline, documentTextOutline, locationOutline, sendOutline, arrowBackOutline
    });
  }

  ngOnInit() { }

  async buscarEvento() {
    if (!this.termoBusca.trim()) return;
    
    const loading = await this.loadingCtrl.create({ message: 'Buscando evento...' });
    await loading.present();

    this.scapService.buscarEvento(this.termoBusca).subscribe({
      next: (evento) => {
        loading.dismiss();
        if (evento) {
          this.eventoEncontrado = evento;
        } else {
          this.mostrarToast('Nenhum evento encontrado com este código.', 'warning');
          this.eventoEncontrado = null;
        }
      },
      error: () => {
        loading.dismiss();
        this.mostrarToast('Erro de conexão ao buscar evento.', 'danger');
        this.eventoEncontrado = null;
      }
    });
  }

  limparBusca() {
    this.eventoEncontrado = null;
    this.termoBusca = '';
    this.novoProjeto = { titulo: '', resumo: '', autor: 'Aluno' };
  }

  async enviar() {
    if (!this.eventoEncontrado) return;

    if (!this.novoProjeto.titulo || !this.novoProjeto.resumo) {
      this.mostrarToast('Preencha todos os campos.', 'warning');
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Enviando projeto...' });
    await loading.present();

    const projeto: Partial<Projeto> = {
      titulo: this.novoProjeto.titulo,
      autor: this.novoProjeto.autor,
      resumo: this.novoProjeto.resumo,
      eventoId: this.eventoEncontrado.id,
      eventoNome: this.eventoEncontrado.titulo
    };

    this.scapService.submeterProjeto(projeto, this.eventoEncontrado).subscribe({
      next: () => {
        loading.dismiss();
        
        // Navegação Segura para evitar travamentos no Android
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        });
        
        this.mostrarToast('Projeto enviado com sucesso!', 'success');
      },
      error: (err) => {
        loading.dismiss();
        console.error(err);
        const msg = err.error?.detail || 'Erro ao enviar projeto. Tente novamente.';
        this.mostrarToast(msg, 'danger');
      }
    });
  }

  async mostrarToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg, duration: 2000, color: color, position: 'top'
    });
    toast.present();
  }
}