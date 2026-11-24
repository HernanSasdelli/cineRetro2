import { Routes } from '@angular/router';
import { conSesionGuard } from './guards/con-sesion-guard';
import { sinSesionGuard } from './guards/sin-sesion-guard';
import { soloAdminGuard } from './guards/solo-admin-guard';
import { salirFormGuard } from './guards/salir-form-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'cartelera', pathMatch: 'full' },
  {
    path: 'cartelera',
    loadComponent: () => import('./pages/cartelera/cartelera').then(m => m.Cartelera),
  },
  {  
    path: 'login',
    canActivate: [sinSesionGuard],
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'registro',
    canActivate: [sinSesionGuard],
    canDeactivate: [salirFormGuard],
    loadComponent: () => import('./pages/registro/registro').then(m => m.Registro),
  },
      {
    path: 'pelicula/:id',
    loadComponent: () => import('./peliculas/detalle-pelicula/detalle-pelicula').then(m => m.DetallePelicula),
  },
    {
    path: 'perfil',
    canActivate: [conSesionGuard],
    loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil),
  },
  {
    path: 'admin',
    canActivate: [conSesionGuard, soloAdminGuard],
    loadComponent: () => import('./admin/panel/panel').then(m => m.Panel),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/no-encontrada/no-encontrada').then(m => m.NoEncontrada),
  },

];