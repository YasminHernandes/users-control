import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpfPipe' })
@Injectable({ providedIn: 'root' })
export class CpfPipe implements PipeTransform {
  transform(cpf: string | null): string {
    if (!cpf) return '';
    
    const cleanedCpf = cpf.replace(/\D/g, '');

    if (cleanedCpf.length !== 11) return '';

    return `${cleanedCpf.slice(0, 3)}.${cleanedCpf.slice(3, 6)}.${cleanedCpf.slice(6, 9)}-${cleanedCpf.slice(9)}`;
  }
}
