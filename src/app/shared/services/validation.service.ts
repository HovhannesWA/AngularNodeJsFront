import { Injectable } from '@angular/core';

interface IValidtingItem {
  name: String;
  value: String;
  params: ['required' | 'mail'];
}

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  validate(data: IValidtingItem[]): [] {
    let validation_result: any;
    data.forEach((item) => {
      let value = item.value;
      let name = item.name.toString();
      validation_result[name] = { errors: [] };

      if (item.params.includes('required')) {        
        validation_result[name].errors.push({required : this.required(value)});
      }
      if (item.params.includes('mail')) {
        validation_result[name].errors.push({required : this.isEmail(value)});
      }      
    });

    return validation_result;
  }

  private required(value: any): Boolean {
    return !!value;
  }

  private isEmail(value: String) {
    return value
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }
}
