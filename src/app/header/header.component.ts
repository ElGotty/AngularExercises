import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";
import { UsersService } from "../auth/users.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.component.css'],
})
export class HeaderComponent {
    
    router = inject(Router);
    userService = inject(UsersService);

    titulo = 'AngularExercises';

    onClickLogout(){
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}