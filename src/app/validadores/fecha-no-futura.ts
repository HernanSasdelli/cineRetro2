import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function fechaNoFutura(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }
    if (new Date(control.value) > new Date()) {
      return { fechaFutura: true };
    }
    return null;
  };
}