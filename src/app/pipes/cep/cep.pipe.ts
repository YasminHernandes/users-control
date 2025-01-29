import { Injectable, Pipe, type PipeTransform } from '@angular/core';

@Pipe({ name: 'cepPipe' })
@Injectable({ providedIn: 'root'})

export class CepPipe implements PipeTransform {

  transform(value: string | null | undefined): string {
    
    if(!value) return '';

    const cep = value.toString().replace(/\D/g, '');

    if(cep.length > 8) return '';

    if(cep.length > 5) {
      return `${cep.slice(0, 5)}-${cep.slice(5)}`;
    }
      
    return cep;
  }

}
