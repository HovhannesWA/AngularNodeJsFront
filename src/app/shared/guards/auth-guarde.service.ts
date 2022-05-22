import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private auth_service: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.auth_service.user.pipe(
            take(1),
            map(user => {
            const is_auth = !!user;
            if(is_auth){
                return true;
            }
            else{
                return this.router.createUrlTree(['/login']);
            }
        }));
    }
}