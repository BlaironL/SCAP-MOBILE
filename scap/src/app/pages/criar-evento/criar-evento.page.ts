import { Component, inject, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastController, LoadingController } from '@ionic/angular'; // Adicionado LoadingController
import { addIcons } from 'ionicons';
import { 
  calendarOutline, 
  locationOutline, 
  textOutline, 
  lockClosedOutline, 
  lockOpenOutline, 
  checkmarkDoneOutline, 
  cloudUploadOutline 
} from 'ionicons/icons';

import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
  IonContent, IonItem, IonLabel, IonInput, IonTextarea, 
  IonDatetime, IonDatetimeButton, IonModal, IonToggle, 
  IonButton, IonIcon, IonNote, IonList
} from '@ionic/angular/standalone';

import { ScapDataService, Evento } from '../../services/scap-data.service'; 

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.page.html',
  styleUrls: ['./criar-evento.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
    IonContent, IonItem, IonLabel, IonInput, IonTextarea, 
    IonDatetime, IonDatetimeButton, IonModal, IonToggle, 
    IonButton, IonIcon, IonNote, IonList
  ]
})
export class CriarEventoPage implements OnInit {
  private fb = inject(FormBuilder);
  private scapService = inject(ScapDataService);
  private router = inject(Router);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController); // Injeção do Loading
  private ngZone = inject(NgZone);

  form: FormGroup;
  minDate: string = new Date().toISOString(); 

  constructor() {
    addIcons({
      calendarOutline, locationOutline, cloudUploadOutline, textOutline,
      lockClosedOutline, lockOpenOutline, checkmarkDoneOutline
    });

    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      local: ['', Validators.required],
      data: [new Date().toISOString(), Validators.required],
      descricao: ['', Validators.required],
      privado: [false]
    });
  }

  ngOnInit() { }

  async salvar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Criando evento...' });
    await loading.present();

    const f = this.form.value;

    // Não geramos ID ou Código aqui. O Django fará isso.
    const novoEvento: Partial<Evento> = {
      titulo: f.titulo,
      local: f.local,
      data: f.data,
      descricao: f.descricao,
      privado: f.privado,
      status: 'Aberto'
    };

    // Inscreve-se para receber a resposta do servidor
    this.scapService.criarEvento(novoEvento).subscribe({
      next: (eventoCriado) => {
        loading.dismiss();
        
        // Navegação Segura (Android Fix)
        this.ngZone.run(() => {
          this.router.navigate(['/dashboard'], { replaceUrl: true });
        });

        // Mostra o código REAL vindo do Django
        this.mostrarToast(`Evento criado! Código: ${eventoCriado.codigo}`);
      },
      error: async (err) => {
        loading.dismiss();
        console.error(err);
        await this.mostrarToast('Erro ao criar evento. Tente novamente.');
      }
    });
  }

  async mostrarToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 3000,
      color: 'success', 
      position: 'top',
      icon: 'checkmark-done-outline'
    });
    toast.present();
  }
}