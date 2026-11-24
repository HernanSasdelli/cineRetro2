import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Peliculas } from '../peliculas';
import { Pelicula } from '../pelicula';

@Component({
  imports: [RouterLink],
  selector: 'app-detalle-pelicula',
  styleUrl: './detalle-pelicula.css',
  templateUrl: './detalle-pelicula.html',
})
export class DetallePelicula implements OnInit {
  private ruta = inject(ActivatedRoute);
  private router = inject(Router);
  private peliculasService = inject(Peliculas);

  pelicula = signal<Pelicula | null>(null);

  ngOnInit() {
    this.ruta.paramMap.subscribe(async params => {
      const id = params.get('id');
      if (id === null) return;

      try {
        this.pelicula.set(await this.peliculasService.traerUnaPelicula(Number(id)));
      } catch {
        this.router.navigate(['/no-encontrada']);
      }
    });
  }

  sinPoster(e: Event) {
    (e.target as HTMLImageElement).src = '/placeholder.svg';
  }
}