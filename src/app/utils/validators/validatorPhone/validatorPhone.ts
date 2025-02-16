import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validatorPhone = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const phoneRegex = /^(\(?\d{2}\)?\s?)?9\d{4}[-]?\d{4}$/;
    const valid = phoneRegex.test(control.value);
    return valid ? null : { invalidPhoneNumber: true };
  };
};
