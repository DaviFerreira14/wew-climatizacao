import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactMessage {
  id?: string;
  nome: string;
  email: string;
  telefone: string;
  servico: string;
  mensagem: string;
  data: Date;
  status: 'novo' | 'lido' | 'respondido';
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private messages: ContactMessage[] = [];

  constructor() {
    this.loadMessages();
    // Inicializar EmailJS com sua Public Key
    emailjs.init('O3k2gyeBXHFIGTUDA');
  }

  async sendMessage(messageData: Omit<ContactMessage, 'id' | 'data' | 'status'>): Promise<boolean> {
    try {
      const message: ContactMessage = {
        ...messageData,
        id: this.generateId(),
        data: new Date(),
        status: 'novo'
      };

      // Configurar parâmetros do email
      const templateParams = {
        from_name: message.nome,
        from_email: message.email,
        phone: message.telefone,
        service: message.servico,
        message: message.mensagem,
        to_email: 'wewclimatizacao@gmail.com'
      };

      // Enviar email usando EmailJS
      await emailjs.send(
        'service_t8gk6sk',
        'template_11rcvdj',
        templateParams
      );

      // Salvar no "banco de dados" local
      this.messages.unshift(message);
      this.saveMessages();

      return true;
    } catch (error: any) {
      console.error('Erro ao enviar mensagem:', error);
      return false;
    }
  }

  getMessages(): ContactMessage[] {
    return this.messages;
  }

  updateMessageStatus(id: string, status: ContactMessage['status']): void {
    const message = this.messages.find(m => m.id === id);
    if (message) {
      message.status = status;
      this.saveMessages();
    }
  }

  deleteMessage(id: string): void {
    this.messages = this.messages.filter(m => m.id !== id);
    this.saveMessages();
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private loadMessages(): void {
    const saved = localStorage.getItem('contact_messages');
    if (saved) {
      this.messages = JSON.parse(saved).map((m: any) => ({
        ...m,
        data: new Date(m.data)
      }));
    }
  }

  private saveMessages(): void {
    localStorage.setItem('contact_messages', JSON.stringify(this.messages));
  }

  // Método para configuração do EmailJS
  configureEmailJS(serviceId: string, templateId: string, publicKey: string): void {
    emailjs.init(publicKey);
  }
}