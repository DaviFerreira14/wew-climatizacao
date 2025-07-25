import { Routes } from '@angular/router';
import { Home } from './paginas/home/home';
import { Servicos } from './paginas/servicos/servicos';
import { Sobre } from './paginas/sobre/sobre';
import { Contato } from './paginas/contato/contato';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'servicos',
        component: Servicos
    },
    {
        path: 'sobre',
        component: Sobre
    },
    {
        path: 'contato',
        component: Contato
    },
    {
        path: '**',
        redirectTo: ''
    }
];
