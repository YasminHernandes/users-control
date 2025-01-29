import { CepPipe } from '../pipes/cep/cep.pipe';
import { PhonePipe } from '../pipes/pipes';

export  class Utils {

  constructor(private cepPipe: CepPipe, private phonePipe: PhonePipe) {}

  formatCep = (el: string | null) => this.cepPipe!.transform(el!)

  formatPhone = (el: string | null) => this.phonePipe!.transform(el!)

  myCalendarFilter = (d: Date | null): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const selectedDate = d || new Date();

    return selectedDate <= today;
  };
}
