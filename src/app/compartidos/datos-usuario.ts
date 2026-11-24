export interface DatosUsuario {
  id: string;
  email: string;
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  color_ojos: string | null;
  dias_vacaciones: number | null;
  rol: 'cliente' | 'empleado' | 'admin';
}

export interface DatosRegistro {
  nombre: string;
  apellido: string;
  fecha_nacimiento: string;
  color_ojos: string;
  dias_vacaciones: number;
}