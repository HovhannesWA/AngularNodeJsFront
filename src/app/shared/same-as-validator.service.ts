import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function sameAs(value_1: any, value_2: any) {
  if (value_1 === value_2) {
    return null;
  } else {
    return { must_match: true };
  }
}
