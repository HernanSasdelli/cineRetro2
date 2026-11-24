import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function clavesIguales(controlClave: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value !== controlClave.value) {
      return { clavesDistintas: true };
    }
    return null;
  };
}