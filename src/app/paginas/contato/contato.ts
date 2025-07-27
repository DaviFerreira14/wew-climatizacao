import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from "../../componentes/footer/footer";
import { ContactService } from '../../services/contato';

declare var bootstrap: any;

@Component({
  selector: 'app-contato',
  imports: [Navbar, CommonModule, FormsModule],
  templateUrl: './contato.html',
  styleUrl: './contato.css'
})
export class Contato {
  isSubmitting = false;
  modalType: 'success' | 'error' = 'success';
  modalTitle = '';
  modalMessage = '';

  // Modelo do formulário
  formData = {
    nome: '',
    email: '',
    telefone: '',
    servico: '',
    mensagem: ''
  };

  constructor(private contactService: ContactService) {}

  async onSubmit(event: Event) {
    event.preventDefault();
    
    if (!this.isFormValid()) {
      this.showErrorModal('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    this.isSubmitting = true;

    try {
      const success = await this.contactService.sendMessage(this.formData);
      
      if (success) {
        this.showSuccessModal();
        this.resetForm();
      } else {
        this.showErrorModal();
      }
    } catch (error) {
      this.showErrorModal();
    } finally {
      this.isSubmitting = false;
    }
  }

  private isFormValid(): boolean {
    return !!(
      this.formData.nome.trim() &&
      this.formData.email.trim() &&
      this.formData.telefone.trim() &&
      this.formData.servico &&
      this.formData.mensagem.trim()
    );
  }

  private resetForm(): void {
    this.formData = {
      nome: '',
      email: '',
      telefone: '',
      servico: '',
      mensagem: ''
    };
  }

  private showSuccessModal(customMessage?: string) {
    this.modalType = 'success';
    this.modalTitle = 'Mensagem Enviada!';
    this.modalMessage = customMessage || 'Sua mensagem foi enviada com sucesso! Em breve entraremos em contato.';
    this.showModal();
  }

  private showErrorModal(customMessage?: string) {
    this.modalType = 'error';
    this.modalTitle = 'Erro no Envio';
    this.modalMessage = customMessage || 'Ocorreu um erro ao enviar sua mensagem. Tente novamente ou entre em contato pelos nossos telefones.';
    this.showModal();
  }

  private showModal() {
    const modalElement = document.getElementById('feedbackModal');
    if (modalElement) {
      // Verificar se Bootstrap está disponível
      if (typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
      } else {
        // Fallback: mostrar modal manualmente
        modalElement.classList.add('show');
        modalElement.style.display = 'block';
        modalElement.setAttribute('aria-hidden', 'false');
        
        // Adicionar backdrop
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        backdrop.id = 'modal-backdrop';
        document.body.appendChild(backdrop);
        
        // Adicionar classe ao body
        document.body.classList.add('modal-open');
        
        // Fechar modal ao clicar no backdrop ou botão fechar
        const closeModal = () => {
          modalElement.classList.remove('show');
          modalElement.style.display = 'none';
          modalElement.setAttribute('aria-hidden', 'true');
          document.body.classList.remove('modal-open');
          
          const existingBackdrop = document.getElementById('modal-backdrop');
          if (existingBackdrop) {
            existingBackdrop.remove();
          }
        };
        
        // Event listeners para fechar
        backdrop.addEventListener('click', closeModal);
        const closeBtn = modalElement.querySelector('.btn-close');
        const actionBtn = modalElement.querySelector('.modal-footer .btn');
        
        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        if (actionBtn) actionBtn.addEventListener('click', closeModal);
      }
    }
  }
}