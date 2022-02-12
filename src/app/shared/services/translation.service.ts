import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TranslationService {  
  $t(key: any) {    
    return this.translations[key] || key;
  }

  private translations: any = {
    username_error_required: 'Username field is required',
    password_error_required: 'Password field is required',
  };
}
