import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService{
  private config = {
      timeOut: 3000
  }
  
  constructor(private toastr: ToastrService) {}

  success(text: string, custom_config?: {}) {
    if(custom_config){
        this.config = {...this.config, ...custom_config}
    }  
    this.toastr.success(text, '', this.config);
  }
}
