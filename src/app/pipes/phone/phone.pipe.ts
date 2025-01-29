import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'phonePipe' })
@Injectable({ providedIn: 'root'})

export class PhonePipe implements PipeTransform {
    transform(phone: string | null): string {
        const invalid_phone = !phone || phone.length < 10 || phone.length > 11;
        
        if(invalid_phone) return ''
        
        const cellphone = phone.length === 11;

        if(cellphone) return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`
        else return `(${phone.slice(0, 2)}) ${phone.slice(2, 6)}-${phone.slice(6)}`;
    }
}