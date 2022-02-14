import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TranslationService {  
  $t(key: any) {    
    return this.translations[key] || key;
  }

  private translations: any = {
    field_is_required: 'Field is required',    
    fields_must_match: ':filed_name must much',
    validation_min_length: 'Must contain at last :minlength cars',
    invalid_email_format: "Invalid E-mail format"
  };
}
