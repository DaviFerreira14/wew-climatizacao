import { Component, OnInit, OnDestroy } from '@angular/core';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from "../../componentes/footer/footer";

interface Servico {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
  caracteristicas: string[];
}

interface Vantagem {
  id: number;
  titulo: string;
  descricao: string;
  icone: string;
}

@Component({
  selector: 'app-servicos',
  imports: [Navbar],
  templateUrl: './servicos.html',
  styleUrl: './servicos.css'
})
export class Servicos implements OnInit, OnDestroy {
  
  // Lista de serviços oferecidos
  servicos: Servico[] = [
    {
      id: 1,
      titulo: 'Instalação de Ar Condicionado',
      descricao: 'Instalação profissional de sistemas de ar condicionado split, multi-split e central com garantia de qualidade.',
      icone: 'bi-wind',
      caracteristicas: [
        'Dimensionamento adequado',
        'Instalação elétrica completa',
        'Teste de funcionamento'
      ]
    },
    {
      id: 2,
      titulo: 'Manutenção Preventiva',
      descricao: 'Mantenha seu equipamento funcionando perfeitamente com nossa manutenção preventiva especializada.',
      icone: 'bi-gear',
      caracteristicas: [
        'Limpeza de filtros',
        'Verificação de gás refrigerante',
        'Inspeção elétrica'
      ]
    },
    {
      id: 3,
      titulo: 'Manutenção Corretiva',
      descricao: 'Reparo rápido e eficiente para qualquer problema em seu sistema de climatização.',
      icone: 'bi-tools',
      caracteristicas: [
        'Diagnóstico preciso',
        'Peças originais',
        'Atendimento 24h'
      ]
    },
    {
      id: 4,
      titulo: 'Limpeza Técnica',
      descricao: 'Limpeza completa e higienização de todo o sistema para garantir ar puro e saudável.',
      icone: 'bi-droplet',
      caracteristicas: [
        'Higienização completa',
        'Produtos específicos',
        'Eliminação de bactérias'
      ]
    },
    {
      id: 5,
      titulo: 'Refrigeração Comercial',
      descricao: 'Soluções em refrigeração para estabelecimentos comerciais, restaurantes e indústrias.',
      icone: 'bi-building',
      caracteristicas: [
        'Câmaras frigoríficas',
        'Balcões refrigerados',
        'Sistemas industriais'
      ]
    },
    {
      id: 6,
      titulo: 'Projeto e Consultoria',
      descricao: 'Desenvolvimento de projetos personalizados e consultoria técnica especializada.',
      icone: 'bi-clipboard-data',
      caracteristicas: [
        'Análise térmica',
        'Projeto executivo',
        'Consultoria técnica'
      ]
    }
  ];

  // Lista de vantagens da empresa
  vantagens: Vantagem[] = [
    {
      id: 1,
      titulo: 'Qualidade Garantida',
      descricao: 'Garantia em todos os serviços e equipamentos instalados',
      icone: 'bi-award'
    },
    {
      id: 2,
      titulo: 'Atendimento Rápido',
      descricao: 'Atendimento ágil e pontual para todas as suas necessidades',
      icone: 'bi-clock'
    },
    {
      id: 3,
      titulo: 'Equipe Especializada',
      descricao: 'Técnicos certificados e com vasta experiência no mercado',
      icone: 'bi-people'
    },
    {
      id: 4,
      titulo: 'Preço Justo',
      descricao: 'Orçamentos transparentes e preços competitivos',
      icone: 'bi-wallet2'
    }
  ];

  // Propriedades para controle de estado
  isLoading: boolean = false;
  selectedService: Servico | null = null;

  constructor() {}

  ngOnInit(): void {
    // Inicialização do componente
    this.initializeComponent();
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    // Limpeza de recursos quando o componente é destruído
    this.removeScrollListeners();
  }

  /**
   * Inicializa o componente
   */
  private initializeComponent(): void {
    console.log('Componente de Serviços inicializado');
    this.isLoading = false;
  }

  /**
   * Configura animações de scroll
   */
  private setupScrollAnimation(): void {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      // Observa todos os cards de serviços
      setTimeout(() => {
        const cards = document.querySelectorAll('.service-card');
        cards.forEach(card => observer.observe(card));
      }, 100);
    }
  }

  /**
   * Remove listeners de scroll
   */
  private removeScrollListeners(): void {
    // Implementar limpeza se necessário
  }

  /**
   * Seleciona um serviço específico
   * @param servico Serviço selecionado
   */
  selectService(servico: Servico): void {
    this.selectedService = servico;
    console.log('Serviço selecionado:', servico.titulo);
  }

  /**
   * Solicita orçamento para um serviço
   * @param servicoId ID do serviço
   */
  solicitarOrcamento(servicoId: number): void {
    const servico = this.servicos.find(s => s.id === servicoId);
    if (servico) {
      console.log('Solicitando orçamento para:', servico.titulo);
      // Aqui você pode implementar a lógica para abrir modal de orçamento
      // ou redirecionar para página de contato
      this.redirectToContact(servico.titulo);
    }
  }

  /**
   * Redireciona para página de contato com serviço pré-selecionado
   * @param servicoTitulo Título do serviço
   */
  private redirectToContact(servicoTitulo: string): void {
    // Implementar navegação para página de contato
    // Exemplo: this.router.navigate(['/contato'], { queryParams: { servico: servicoTitulo } });
    console.log('Redirecionando para contato com serviço:', servicoTitulo);
  }

  /**
   * Scroll suave para seção específica
   * @param elementId ID do elemento
   */
  scrollToSection(elementId: string): void {
    if (typeof document !== 'undefined') {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }

  /**
   * Retorna a classe CSS para o ícone do serviço
   * @param servico Serviço
   * @returns String com classes CSS
   */
  getServiceIconClass(servico: Servico): string {
    return `bi ${servico.icone} text-primary`;
  }

  /**
   * Retorna a classe CSS para o ícone da vantagem
   * @param vantagem Vantagem
   * @returns String com classes CSS
   */
  getAdvantageIconClass(vantagem: Vantagem): string {
    return `bi ${vantagem.icone} text-white`;
  }

  /**
   * Verifica se um serviço está selecionado
   * @param servicoId ID do serviço
   * @returns Boolean
   */
  isServiceSelected(servicoId: number): boolean {
    return this.selectedService?.id === servicoId;
  }

  /**
   * Limpa a seleção de serviço
   */
  clearServiceSelection(): void {
    this.selectedService = null;
  }

  /**
   * Método para tracking de mudanças no *ngFor
   * @param index Índice do item
   * @param item Item da lista
   * @returns Identificador único
   */
  trackByServiceId(index: number, item: Servico): number {
    return item.id;
  }

  /**
   * Método para tracking de mudanças no *ngFor das vantagens
   * @param index Índice do item
   * @param item Item da lista
   * @returns Identificador único
   */
  trackByAdvantageId(index: number, item: Vantagem): number {
    return item.id;
  }
}