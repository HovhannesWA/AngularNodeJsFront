import { Component, OnInit } from "@angular/core";
import { LoginService } from "./login.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: string = '';
    password: string = '';
    constructor(private login_servise: LoginService){}

    ngOnInit(): void {
        //
    }

    login(){
        this.login_servise.login(this.username, this.password);
    }
}