import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const isPasswordConfirmationValid: ValidatorFn = (formGroup: AbstractControl): ValidationErrors | null => {

    if (formGroup.get('password') !== null && formGroup.get('passwordConfirmation') !== null) {
        let password = formGroup.get('password')?.value;
        let passwordConfirmation = formGroup.get('passwordConfirmation')?.value;

        return password === passwordConfirmation ? null : { error: "Password confirmation is not valid" }
    }

    return null;
}