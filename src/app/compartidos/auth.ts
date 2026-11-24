import { Injectable, inject, signal } from '@angular/core';
import { Supabase } from './supabase';
import { DatosUsuario,DatosRegistro } from './datos-usuario';

@Injectable({ providedIn: 'root' })
export class Auth {
  private sb = inject(Supabase).cliente;

  perfil = signal<DatosUsuario | null>(null);

  revisarSesion: Promise<void>;

  constructor() {
    this.revisarSesion = this.cargarSesion();
  }

  async cargarSesion() {
    const { data } = await this.sb.auth.getSession();
    if (data.session) {
      await this.cargarPerfil(data.session.user.id);
    }
  }

  async login(correo: string, clave: string) {
    const { data, error } = await this.sb.auth.signInWithPassword({ email: correo, password: clave });
    if (error) throw error;
    await this.cargarPerfil(data.user.id);
  }

  async registro(correo: string, clave: string, datos: any) {
    const { data, error } = await this.sb.auth.signUp({
      email: correo,
      password: clave,
      options: { data: datos },
    });
    if (error) throw error;
    if (data.user) {
      await this.cargarPerfil(data.user.id);
    }
  }

  async cargarPerfil(id: string) {
    const respuesta = await this.sb.from('perfiles').select('*').eq('id', id).single();
    this.perfil.set(respuesta.data as DatosUsuario);
  }

  async logout() {
    await this.sb.auth.signOut();
    this.perfil.set(null);
  }
}