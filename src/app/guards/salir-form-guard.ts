import { CanDeactivateFn } from '@angular/router';
import { Registro } from '../pages/registro/registro';

export const salirFormGuard: CanDeactivateFn<Registro> = (component, currentRoute, currentState, nextState) => {
  if (component.form.dirty && !component.guardado) {
    return confirm('Tenés datos sin guardar. ¿Seguro que querés salir?');
  }
  return true;
};