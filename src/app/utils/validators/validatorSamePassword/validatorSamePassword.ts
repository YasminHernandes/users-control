import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validatorSamePassword: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password && confirmPassword && password.value != confirmPassword.value) {
    return { passwordMatchError: true };
  } else  return null;
};
