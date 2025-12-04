import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Navegação
import { AuthService } from '../../services/auth.service';
import { addIcons } from 'ionicons';
import { personOutline, mailOutline, lockClosedOutline, checkmarkDoneOutline, arrowBackOutline } from 'ionicons/icons';

// Imports Standalone
import { 
  IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
  IonContent, IonList, IonItem, IonInput, IonButton, IonIcon, 
  ToastController, LoadingController 
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule,
    IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, 
    IonContent, IonList, IonItem, IonInput, IonButton, IonIcon
  ]
})
export class CadastroPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private toastCtrl = inject(ToastController);
  private loadingCtrl = inject(LoadingController);

  form: FormGroup;

  constructor() {
    addIcons({ personOutline, mailOutline, lockClosedOutline, checkmarkDoneOutline, arrowBackOutline });

    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(3)]], // Nome Completo
      username: ['', [Validators.required, Validators.minLength(4)]],   // Usuário único
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async cadastrar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const loading = await this.loadingCtrl.create({ message: 'Criando conta...' });
    await loading.present();

    this.authService.register(this.form.value).subscribe({
      next: async () => {
        loading.dismiss();
        await this.mostrarToast('Conta criada com sucesso! Faça login.', 'success');
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        loading.dismiss();
        console.error(err);
        
        // Tratamento básico de erros do Django
        let msg = 'Erro ao criar conta. Tente novamente.';
        if (err.error?.username) msg = 'Este nome de usuário já está em uso.';
        if (err.error?.email) msg = 'Este email já está cadastrado.';
        if (err.status === 0) msg = 'Sem conexão com o servidor.';

        await this.mostrarToast(msg, 'danger');
      }
    });
  }

  async mostrarToast(msg: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 3000,
      color: color,
      position: 'top',
      icon: color === 'success' ? 'checkmark-done-outline' : 'alert-circle-outline'
    });
    toast.present();
  }
}