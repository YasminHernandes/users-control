import { FormControl, FormGroup } from '@angular/forms';
import { IAddress } from './../index';

export interface IUser {
  name: FormControl<string | null>;
  cpf: FormControl<string | null>;
  birthDate: FormControl<Date | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
  telephone: FormControl<string | null>;
  role: FormControl<string | null>;
  address: FormGroup<IAddress>;
}


export interface IUserRequest {
  name: string | null;
  cpf: string | null;
  birthDate: Date | null;
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
  telephone: string | null;
  role: string | null;
  address: {
    street: string | null;
    number: string | null;
    zipCode: string | null;
    complement?: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
  };
}
