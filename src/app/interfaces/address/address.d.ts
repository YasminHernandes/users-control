import { FormControl } from '@angular/forms';

export interface IAddress {
  street: FormControl<string | null>;
  number: FormControl<string | null>;
  zipCode: FormControl<string | null>;
  complement: FormControl<string | null>;
  city: FormControl<string | null>;
  state: FormControl<string | null>;
  country: FormControl<string | null>;
}

export interface IState {
  id: number;
  nome: string;
  sigla: string;
}

export interface ICountry {
  id: number;
  nome: string;
}

export interface IStreet {
  bairro: string,
  logradouro: string,
  localidade: string,
  erro: string
}