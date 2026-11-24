import { Component, input, output } from '@angular/core';
import { Pelicula } from '../pelicula';

@Component({
  selector: 'app-tarjeta-pelicula',
  imports: [],
  templateUrl: './tarjeta-pelicula.html',
  styleUrl: './tarjeta-pelicula.css',
})
export class TarjetaPelicula {
  pelicula = input.required<Pelicula>();
  elegida = output<Pelicula>();

  elegir() {
    this.elegida.emit(this.pelicula());
  }

  sinPoster(e: Event) {
    (e.target as HTMLImageElement).src = '/placeholder.svg';
  }
}