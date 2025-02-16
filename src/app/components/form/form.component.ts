import { IAddress, ICountry, IState, IUser } from './../../interfaces';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { LocationsService } from '../../services/locations.service';
import { CEPService } from '../../services/cep.service';
import { Utils } from 'src/app/utils/utils';
import { CepPipe, PhonePipe } from 'src/app/pipes/pipes';
import { RegisterService } from 'src/app/services/register.service';
import { IUserRequest } from 'src/app/interfaces/user/user';
import { CpfPipe } from '../../pipes/cpf/cpf.pipe';
import { validatorCPF, validatorPhone, validatorSamePassword } from './../../utils/validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private locationsService: LocationsService,
    private cepService: CEPService,
    private registerService: RegisterService,
    private cepPipe: CepPipe,
    private cpfPipe: CpfPipe,
    private phonePipe: PhonePipe
  ) {}

  utils = new Utils(this.cepPipe, this.phonePipe, this.cpfPipe);

  states: IState[] = [];
  country: ICountry[] = [];
  calendarFilter = this.utils.myCalendarFilter;
  formattedCep: string | null | undefined;
  formattedPhone: string | null | undefined;
  formattedCpf: string | null | undefined;
  formattedStreet: string | null | undefined;
  formattedBirthDay: string | null | undefined;
  messageError: string = '';
  onValidatePassword!: { widthPasswordProgress: number; bgProgressColor: string };

  userForm = this.fb.group<IUser>({
    name: this.fb.control('', Validators.required),
    cpf: this.fb.control('', [Validators.required, validatorCPF()]),
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
    telephone: this.fb.control('', [Validators.required, validatorPhone()]),
    role: this.fb.control('', Validators.required),
    address: this.fb.group<IAddress>({
      street: this.fb.control('', Validators.required),
      number: this.fb.control('', Validators.required),
      zipCode: this.fb.control('', Validators.required),
      complement: this.fb.control(''),
      city: this.fb.control('', Validators.required),
      state: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
    }),
  }, 
  { validators: validatorSamePassword } as AbstractControlOptions
  );

  widthPasswordProgress: number = 0;
  bgProgressColor: string = '';

  toast = {
    iconType: '',
    title: '',
    message: '',
    status: false,
    opacity: ''
  }

  onFormattedCep(cep: string | null) {
    this.formattedCep = this.utils.formatCep(cep);
  }
  onFormattedPhone(phone: string | null) {
    this.formattedPhone = this.utils.formatPhone(phone);
  }
  onFormattedCpf(cpf: string | null) {
    this.formattedCpf = this.utils.formatCPF(cpf);
  }

  handleMessageError(input: string, errorName: string, hasValue?: boolean) {
    const value = String(this.userForm.get(input)?.value);
    
    if (hasValue) return this.userForm.get(input)?.hasError(errorName!) && value?.length !== 0 
    else return this.userForm.get(input)?.hasError(errorName!) && value?.length == 0
  }

  handleConfirmPassword() {
    if(this.userForm.hasError('passwordMatchError')) {
      this.userForm.get('confirmPassword')?.setErrors({ passwordMatchError: true })
    }
  }

  handleValidatePassword(event: Event) {
    this.onValidatePassword = this.utils.validatePassword(event);
    this.widthPasswordProgress = this.utils.validatePassword(event).widthPasswordProgress;
    this.bgProgressColor = this.utils.validatePassword(event).bgProgressColor;
  }


  handleSubmit() {
    if(this.userForm.valid) {
      const userRequest = this.userForm.getRawValue() as IUserRequest
      
      this.registerService.register(userRequest).subscribe({
        next: () => {
          this.toast = {
            iconType: 'success',
            title: 'Sucesso',
            message: 'Usuário cadastrado com sucesso!',
            status: true,
            opacity: 'opacity-100'
          }
          

          setTimeout(() => {
            this.toast = { ...this.toast, status: false, opacity: 'opacity-0'}
          }, 3000)

        },
        error: (error) => {
          this.toast = {
            iconType: 'error',
            title: 'Erro',
            message: 'Usuário já existe!',
            status: true,
            opacity: 'opacity-100'
          }
          setTimeout(() => {
            this.toast = { ...this.toast, status: false, opacity: 'opacity-0' }
          }, 3000)
        },
      });

    } else console.log('Formulário inválido');
  }

  getLocationInfo() {
    const cep = this.userForm.get('address.zipCode')?.value?.replace('-', '');

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

  ngOnInit(): void {
    this.locationsService
      .getStates()
      .subscribe((response) => (
        this.states = response.sort((a, b) => a.nome!.localeCompare(b.nome!))
      ));

    this.locationsService
      .getCountry()
      .subscribe((response) => (this.country = response));
  }
}
