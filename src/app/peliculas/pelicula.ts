export interface Pelicula {
  id: number;
  titulo: string;
  sinopsis: string;
  duracion_min: number;
  restriccion_edad: number;
  imagen_url: string | null;
}