import { FormControl, FormGroup } from '@angular/forms';
import { IAddress } from './../index';

export interface IUser {
    name: FormControl<string | null>;
    birthDate: FormControl<Date | null>;
    email: FormControl<string | null>;
    password: FormControl<string | null>;
    confirmPassword: FormControl<string | null>;
    telephone: FormControl<string | null>;
    role: FormControl<string | null>;
    address: FormGroup<IAddress>;
  }