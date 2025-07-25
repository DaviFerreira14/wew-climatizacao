import { Component } from '@angular/core';
import { Navbar } from "../../componentes/navbar/navbar";
import { Footer } from "../../componentes/footer/footer";

@Component({
  selector: 'app-sobre',
  imports: [Navbar],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {
  constructor() { }

  ngOnInit(): void {
    // Animação suave ao carregar a página
    this.animateOnLoad();
  }

  private animateOnLoad(): void {
    // Adiciona classe de animação após o componente ser carregado
    setTimeout(() => {
      const elements = document.querySelectorAll('.content-text, .image-container');
      elements.forEach((element, index) => {
        element.classList.add('animate__animated', 'animate__fadeInUp');
        (element as HTMLElement).style.animationDelay = `${index * 0.2}s`;
      });
    }, 100);
  }
}

