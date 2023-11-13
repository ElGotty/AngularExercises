import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../auth/users.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    
    router = inject(Router);
    userService = inject(UsersService);

    titulo = 'App - navegador';

    onClickLogout(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}