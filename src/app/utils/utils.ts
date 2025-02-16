import { CepPipe } from '../pipes/cep/cep.pipe';
import { PhonePipe } from '../pipes/pipes';
import { CpfPipe } from '../pipes/cpf/cpf.pipe';
import { AbstractControl } from '@angular/forms';

export class Utils {
  constructor(
    private cepPipe: CepPipe,
    private phonePipe: PhonePipe,
    private cpfPipe: CpfPipe
  ) {}

  formatCep = (el: string | null) => this.cepPipe!.transform(el!);

  formatPhone = (el: string | null) => this.phonePipe!.transform(el!);

  formatCPF = (el: string | null) => this.cpfPipe!.transform(el!);

  myCalendarFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = d || new Date();

    return selectedDate <= today;
  };

  validatePassword = (event: Event) => {
    const password = event.target as HTMLInputElement;
    const isValidLength = password.value.length >= 8;
    let score = 0;

    let widthPasswordProgress = 0;
    let bgProgressColor = '';

    const bgColors = {
      1: 'bg-red-500',
      2: 'bg-orange-500',
      3: 'bg-yellow-500',
      4: 'bg-lime-500',
      5: 'bg-green-500',
    };

    if (isValidLength) score++;
    if (password.value.match(/[A-Z]/)) score++;
    if (password.value.match(/[a-z]/)) score++;
    if (password.value.match(/[0-9]/)) score++;
    if (password.value.match(/[@$!%*?&]/)) score++;

    widthPasswordProgress = (score / 5) * 100;

    switch (score) {
      case 1:
        bgProgressColor = bgColors[score];
        break;
      case 2:
        bgProgressColor = bgColors[score];
        break;
      case 3:
        bgProgressColor = bgColors[score];
        break;
      case 4:
        bgProgressColor = bgColors[score];
        break;
      case 5:
        bgProgressColor = bgColors[score];
        break;
      default:
        bgProgressColor = '';
        break;
    }

    return { widthPasswordProgress, bgProgressColor };
  };
}
