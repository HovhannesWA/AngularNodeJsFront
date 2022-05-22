import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth_service: AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(!this.auth_service.access_token){
            return next.handle(req);
        }
        else{
            let access_token = this.auth_service.access_token;
            let modified_req = req.clone({headers: req.headers.set('Auth', access_token)})
            return next.handle(modified_req);
        }
    }
}