import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../compartidos/auth';

export const conSesionGuard: CanActivateFn = async (route, state) => {//
  const auth = inject(Auth);
  const router = inject(Router);

  await auth.revisarSesion;

  if (auth.perfil()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};