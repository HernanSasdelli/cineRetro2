import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../compartidos/auth';

export const sinSesionGuard: CanActivateFn = async (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  await auth.revisarSesion;

  if (auth.perfil()) {
    router.navigate(['/cartelera']);
    return false;
  }
  return true;
};