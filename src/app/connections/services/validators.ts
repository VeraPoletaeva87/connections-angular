import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function dateValidator(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if (!value) {
            return null;
        }

        const dateValid = new Date(value) <= new Date();
        
        return !dateValid ? {dateInvalid:'The date is invalid'}: null;
    }
}