import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './componentes/footer/footer';
import { NgIf } from '@angular/common';
import { Navbar } from "./componentes/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'wew';
  mostrarFooter = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.innerHeight + window.scrollY;
    const pageHeight = document.body.offsetHeight;
    this.mostrarFooter = scrollPosition >= pageHeight;
  }
}
