import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { saveOutline, locationOutline, textOutline, calendarNumberOutline, lockClosedOutline, peopleOutline, addOutline, trashOutline } from 'ionicons/icons';
import { ScapDataService, Evento } from '../../services/scap-data.service'; // Importar Service

@Component({
  selector: 'app-criar-evento',
  templateUrl: './criar-evento.page.html',
  styleUrls: ['./criar-evento.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CriarEventoPage implements OnInit {

  evento = {
    titulo: '',
    local: '',
    data: new Date().toISOString(),
    descricao: '',
    privado: false, // Novo campo
    codigo: ''      // Novo campo (Token)
  };

  novoOrganizador = '';
  organizadoresConvidados: string[] = [];

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
    private scapService: ScapDataService // Injetar Service
  ) {
    addIcons({ saveOutline, locationOutline, textOutline, calendarNumberOutline, lockClosedOutline, peopleOutline, addOutline, trashOutline });
  }

  ngOnInit() {
    // Gera um token assim que abre a tela
    this.evento.codigo = this.scapService.gerarCodigoUnico();
  }

  adicionarOrganizador() {
    if (this.novoOrganizador.trim().length > 0 && this.novoOrganizador.includes('@')) {
      this.organizadoresConvidados.push(this.novoOrganizador);
      this.novoOrganizador = '';
    }
  }

  removerOrganizador(email: string) {
    this.organizadoresConvidados = this.organizadoresConvidados.filter(e => e !== email);
  }

  async criar() {
    // Monta o objeto final
    const novoEvento: Evento = {
      id: Date.now().toString(),
      ...this.evento,
      organizadores: this.organizadoresConvidados,
      status: 'Aberto'
    };

    // Salva no Service
    this.scapService.criarEvento(novoEvento);

    const toast = await this.toastCtrl.create({
      message: `Evento criado! Código: ${this.evento.codigo}`,
      duration: 3000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
    this.navCtrl.navigateBack('/dashboard');
  }
}