import { Injectable, Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'phonePipe' })@Injectable({ providedIn: 'root' })
export class PhonePipe implements PipeTransform {
    transform(phone: string | null): string {
        if (!phone) return '';

        const cleanedPhone = phone.replace(/\D/g, '').trim();
        
        const isCellphone = cleanedPhone.length == 11 || cleanedPhone.length <=  14
        
        return isCellphone
            ? `(${cleanedPhone.slice(0, 2)}) ${cleanedPhone.slice(2, 7)}-${cleanedPhone.slice(7)}`
            : '';
    }
}

