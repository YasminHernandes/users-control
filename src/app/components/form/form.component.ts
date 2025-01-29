import { ICountry, IState, IUser } from './../../interfaces';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { CEPService } from '../../services/cep.service';
import { Utils } from 'src/app/utils/utils';
import { CepPipe, PhonePipe } from 'src/app/pipes/pipes';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private locationsService: LocationsService,
    private cepService: CEPService,
    private cepPipe: CepPipe,
    private phonePipe: PhonePipe
  ) {}

  utils = new Utils(this.cepPipe, this.phonePipe);

  states: IState[] = [];
  country: ICountry[] = [];
  calendarFilter = this.utils.myCalendarFilter;
  formattedCep: string | null | undefined;
  formattedPhone: string | null | undefined;
  formattedStreet: string | null | undefined;
  formattedBirthDay: string | null | undefined;
  messageError: string = '';

  userForm = this.fb.group<IUser>({
    name: this.fb.control('', Validators.required),
    birthDate: this.fb.control(null, Validators.required),
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      ),
    ]),
    confirmPassword: this.fb.control('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    telephone: this.fb.control('', Validators.required),
    role: this.fb.control('', Validators.required),
    address: this.fb.group({
      street: this.fb.control('', Validators.required),
      number: this.fb.control('', Validators.required),
      zipCode: this.fb.control('', Validators.required),
      complement: this.fb.control(''),
      city: this.fb.control('', Validators.required),
      state: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
    }),
  });

  widthPasswordProgress: number = 0;
  bgProgressColor: string = '';


  onFormattedCep(cep: string | null) {
    this.formattedCep = this.utils.formatCep(cep);
  }
  onFormattedPhone(phone: string | null) {
    this.formattedPhone = this.utils.formatPhone(phone);
  }

  getLocationInfo() {
    const cep = this.userForm.get('address.zipCode')?.value;

    cep!.length > 0 &&
      this.cepService.getCEP(cep!).subscribe({
        next: (response) => {
          if (response?.erro === 'true') {
            this.userForm.get('address.zipCode')?.setErrors({ cepInvalid: true });
            this.userForm.controls.address.patchValue({ street: '', city: '' });
          } else {
            response?.logradouro !== undefined && response?.bairro !== undefined &&
            (this.formattedStreet = `${response?.logradouro}, ${response?.bairro}`);

            this.userForm.get('address.street')?.setValue(this.formattedStreet!);
            this.userForm.get('address.city')?.setValue(response.localidade);
          }
        },
        error: (err) => {
          console.error('ERROR: ', err);
          this.userForm.get('address.zipCode')?.setErrors({ cepInvalid: true });
        },
      });
  }

  handleMessageError(input: string, errorName: string, hasValue?: boolean) {
    const value = String(this.userForm.get(input)?.value);

    if (hasValue)
      return (this.userForm.get(input)?.hasError(errorName!) && value?.length !== 0)
    else
      return (this.userForm.get(input)?.hasError(errorName!) && value?.length == 0)
  }

  validatePassword(event: Event) {
    const password = event.target as HTMLInputElement;
    const isValidLength = password.value.length >= 8;
    let score = 0;

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

    this.widthPasswordProgress = (score / 5) * 100;

    switch (score) {
      case 1:
        this.bgProgressColor = bgColors[score];
        break;
      case 2:
        this.bgProgressColor = bgColors[score];
        break;
      case 3:
        this.bgProgressColor = bgColors[score];
        break;
      case 4:
        this.bgProgressColor = bgColors[score];
        break;
      case 5:
        this.bgProgressColor = bgColors[score];
        break;
      default:
        this.bgProgressColor = '';
        break;
    }
  }

  validateSamePassword() {
    const passValue = this.userForm.get('password')?.value;
    const confirmPassValue = this.userForm.get('confirmPassword')?.value;

    return passValue === confirmPassValue
      ? null
<<<<<<< HEAD
      : this.userForm.get('confirmPassword')?.setErrors({ passwordsMismatch: true });
=======
      : this.userForm
          .get('confirmPassword')
          ?.setErrors({ passwordsMismatch: true });
>>>>>>> ac7f6d091b4793386e9f8ff8fad2c6dbe477993b
  }

  handleSubmit() {}

  ngOnInit(): void {
    this.locationsService
      .getStates()
      .subscribe((response) => (
        this.states = response.sort((a, b) => a.nome.localeCompare(b.nome))
      ));

    this.locationsService
      .getCountry()
      .subscribe((response) => (this.country = response));
  }
}
