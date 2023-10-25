import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formulario: FormGroup;

  usersService = inject(UsersService);
  router = inject(Router);

  constructor(){
    this.formulario = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }

  async onSubmit(){
    const response = await this.usersService.login(this.formulario.value);
      localStorage.setItem('token', response.response);
      this.router.navigate(['/clientes']);
    
  }

}
