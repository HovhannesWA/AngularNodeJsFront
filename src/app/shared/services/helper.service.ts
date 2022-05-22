import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface IServer_Error {
  error: {
    errors: {
      param: string;
      msg: string;
    }[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  catchServerErrors(errors: IServer_Error, form: FormGroup) {    
    if (errors.error?.errors && Array.isArray(errors.error.errors)) {
      let server_errors = errors.error?.errors;
      server_errors.forEach((err) => {
        let server_err = {
          server_error: err.msg,
        };

        form.get(err.param)?.setErrors(server_err);
      });
      form.markAsTouched();
      form.updateValueAndValidity();
    }
  }
}
