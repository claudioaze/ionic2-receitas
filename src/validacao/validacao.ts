import { FormGroup, ValidatorFn, FormControl, AbstractControl } from '@angular/forms';

export class Validacao {

  static mesmoValor(formControlReference: FormControl): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const igual = formControlReference.value === control.value;
      return igual ? null : { 'valor': formControlReference.value + ' diferente de ' + control.value };
    };
  }

  static email(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } => {
        const EMAIL_REGEXP = /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
        const valido = control.value.length > 0 && EMAIL_REGEXP.test(control.value);
        return valido ? null : { 'valor': false };
      }
    
  }

}