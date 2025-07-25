import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../componentes/navbar/navbar';
import { Footer } from "../../componentes/footer/footer";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home {}
