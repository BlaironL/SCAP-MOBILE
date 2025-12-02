import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { 
  starOutline, star, chevronForwardOutline, closeOutline, saveOutline, 
  personCircleOutline, checkmarkDoneCircleOutline
} from 'ionicons/icons';

// IMPORTAÇÕES EXPLÍCITAS
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
  IonList, IonItem, IonLabel, IonIcon, IonButton, IonModal, IonRange,
  IonTextarea
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-avaliar',
  templateUrl: './avaliar.page.html',
  styleUrls: ['./avaliar.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent,
    IonList, IonItem, IonLabel, IonIcon, IonButton, IonModal, IonRange,
    IonTextarea
  ]
})
export class AvaliarPage implements OnInit {
  
  isModalOpen = false;

  projetosPendentes = [
    {
      id: 201,
      titulo: 'Sistema de Irrigação Automatizado',
      autor: 'João Pedro',
      resumo: 'Protótipo utilizando Arduino e sensores de umidade.',
      categoria: 'Tecnologia'
    },
    {
      id: 202,
      titulo: 'Impacto das Redes Sociais na Ansiedade',
      autor: 'Ana Clara',
      resumo: 'Estudo de caso com adolescentes de 15 a 18 anos.',
      categoria: 'Saúde Mental'
    }
  ];

  avaliacaoAtual = {
    projetoId: 0,
    titulo: '',
    notas: { originalidade: 0, relevancia: 0, metodologia: 0, apresentacao: 0 },
    comentario: ''
  };

  constructor() {
    addIcons({ starOutline, star, chevronForwardOutline, closeOutline, saveOutline, personCircleOutline, checkmarkDoneCircleOutline });
  }

  ngOnInit() { }

  abrirAvaliacao(projeto: any) {
    this.avaliacaoAtual = {
      projetoId: projeto.id,
      titulo: projeto.titulo,
      notas: { originalidade: 0, relevancia: 0, metodologia: 0, apresentacao: 0 },
      comentario: ''
    };
    this.isModalOpen = true;
  }

  cancelar() {
    this.isModalOpen = false;
  }

  confirmar() {
    console.log('Avaliação Salva:', this.avaliacaoAtual);
    this.projetosPendentes = this.projetosPendentes.filter(p => p.id !== this.avaliacaoAtual.projetoId);
    this.isModalOpen = false;
  }

  get mediaAtual() {
    const { originalidade, relevancia, metodologia, apresentacao } = this.avaliacaoAtual.notas;
    const soma = (Number(originalidade) + Number(relevancia) + Number(metodologia) + Number(apresentacao));
    return soma / 4;
  }
}