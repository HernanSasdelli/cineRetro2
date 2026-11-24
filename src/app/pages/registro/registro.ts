import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../compartidos/auth';
import { clavesIguales } from '../../validadores/claves-iguales';
import { fechaNoFutura } from '../../validadores/fecha-no-futura';
import { traducirError } from '../../compartidos/errores';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro {
  private auth = inject(Auth);
  private router = inject(Router);

  error = signal('');
  enviando = signal(false);
  guardado = false;

  coloresOjos = ['Marrón', 'Negro', 'Verde', 'Azul', 'Gris', 'Otro'];

  controlClave = new FormControl('', [Validators.required, Validators.minLength(6)]);

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    clave: this.controlClave,
    clave2: new FormControl('', [Validators.required, clavesIguales(this.controlClave)]),
    fecha_nacimiento: new FormControl('', [Validators.required, fechaNoFutura()]),
    color_ojos: new FormControl('', [Validators.required]),
    dias_vacaciones: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(365)]),
  });

  async registrar() {
    this.error.set('');
    this.enviando.set(true);
    const v = this.form.value;
    try {
      await this.auth.registro(v.correo!, v.clave!, {
        nombre: v.nombre!,
        apellido: v.apellido!,
        fecha_nacimiento: v.fecha_nacimiento!,
        color_ojos: v.color_ojos!,
        dias_vacaciones: v.dias_vacaciones!,
      });
      this.guardado = true;
      this.router.navigate(['/cartelera']);
    } catch (e: any) {
      this.error.set(traducirError(e.code));
    } finally {
      this.enviando.set(false);
    }
  }
}