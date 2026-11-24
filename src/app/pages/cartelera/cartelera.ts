import { Component, signal, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pelicula } from '../../peliculas/pelicula';
import { Peliculas } from '../../peliculas/peliculas';
import { TarjetaPelicula } from '../../peliculas/tarjeta-pelicula/tarjeta-pelicula';

@Component({
  imports: [TarjetaPelicula],
  selector: 'app-cartelera',
  styleUrl: './cartelera.css',
  templateUrl: './cartelera.html',
})
export class Cartelera implements OnInit {
  private peliculasService = inject(Peliculas);
  private router = inject(Router);

  peliculas = signal<Pelicula[]>([]);
  cargando = signal(true);
  error = signal('');

  async ngOnInit() {
    try {
      this.peliculas.set(await this.peliculasService.traerPeliculas());
    } catch {
      this.error.set('No se pudo cargar la cartelera.');
    } finally {
      this.cargando.set(false);
    }
  }

  recibirPelicula(p: Pelicula) {
    this.router.navigate(['/pelicula', p.id]);
  }
}