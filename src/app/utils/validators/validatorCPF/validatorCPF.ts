import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const validatorCPF = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    let cpfRaw = ''

   if(control.value.includes('.') || control.value.includes('-')) {
    cpfRaw = control.value.replace(/[.-]/g, '');
   }  else cpfRaw = control.value;

    let sum = 0;
    let rest = 0;

    if (
      cpfRaw == null ||
      cpfRaw.length < 11 ||
      cpfRaw === '00000000000' ||
      cpfRaw === '11111111111' ||
      cpfRaw === '22222222222' ||
      cpfRaw === '33333333333' ||
      cpfRaw === '44444444444' ||
      cpfRaw === '55555555555' ||
      cpfRaw === '66666666666' ||
      cpfRaw === '77777777777' ||
      cpfRaw === '88888888888' ||
      cpfRaw === '99999999999'
    ) return { cpfInvalid: true };

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpfRaw.substring(i - 1, i)) * (11 - i);
    }

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpfRaw.substring(9, 10)))
      return { cpfInvalid: true };

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpfRaw.substring(i - 1, i)) * (12 - i);
    }

    rest = (sum * 10) % 11;

    if (rest == 10 || rest == 11) rest = 0;
    if (rest != parseInt(cpfRaw.substring(10, 11)))
      return { cpfInvalid: true };

    return null;
  };
}
