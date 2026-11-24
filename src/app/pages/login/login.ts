import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../compartidos/auth';
import { traducirError } from '../../compartidos/errores';

@Component({
  imports: [ReactiveFormsModule, RouterLink],
  selector: 'app-login',
  styleUrl: './login.css',
  templateUrl: './login.html',
})
export class Login {
  private auth = inject(Auth);
  private router = inject(Router);

  error = signal('');
  enviando = signal(false);

  form = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email]),
    clave: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  accesoRapido(correo: string, clave: string) {
    this.form.setValue({ correo: correo, clave: clave });
  }

  async ingresar() {
    this.error.set('');
    this.enviando.set(true);
    try {
      await this.auth.login(this.form.value.correo!, this.form.value.clave!);
      if (this.auth.perfil()?.rol === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/cartelera']);
      }
    } catch (e: any) {
      this.error.set(traducirError(e.code));
    } finally {
      this.enviando.set(false);
    }
  }
}