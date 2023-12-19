import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasEnoughLength = value.length >= 8;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSpecialCharacter = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(value);
    const passwordValid =
      hasEnoughLength &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumeric &&
      hasSpecialCharacter;
    let errMessage = 'It must have ';

    if (!hasEnoughLength) {
      errMessage = errMessage + 'at least 8 characters, ';
    }
    if (!hasUpperCase || !hasLowerCase) {
      errMessage =
        errMessage + 'a mixture of both uppercase and lowercase letters, ';
    }
    if (!hasNumeric) {
      errMessage = errMessage + 'a mixture of letters and numbers, ';
    }
    if (!hasSpecialCharacter) {
      errMessage =
        errMessage +
        'include of at least one special character, e.g., ! @ # ? ]';
    }
    return !passwordValid ? { passwordStrength: errMessage } : null;
  };
}

export function firstNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }
    const letters = /^[a-zA-Z\s]+$/.test(value);
    return !letters
      ? { firstName: 'First name can include only letters or spaces.' }
      : null;
  };
}
