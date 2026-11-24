import { Injectable, inject } from '@angular/core';
import { Supabase } from '../compartidos/supabase';
import { Pelicula } from './pelicula';

@Injectable({ providedIn: 'root' })
export class Peliculas {
  private sb = inject(Supabase).cliente;

  async traerPeliculas(): Promise<Pelicula[]> {
    const { data, error } = await this.sb
      .from('peliculas')
      .select('*')
      .eq('activa', true)
      .order('titulo');
    if (error) throw error;
    return data as Pelicula[];
  }

  async traerUnaPelicula(id: number): Promise<Pelicula> {
    const { data, error } = await this.sb
      .from('peliculas')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as Pelicula;
  }
}