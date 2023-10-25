import { Component, inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formulario: FormGroup;
  userService = inject(UsersService);
  router = inject(Router);

  constructor(){
    this.formulario = new FormGroup({
      username: new FormControl(),
      lastname: new FormControl(),
      firstname: new FormControl(),
      country: new FormControl(),
      password: new FormControl()
    })
  }

  async onSubmit(){
    const response = await this.userService.register(this.formulario.value);
    if(!response.error){
      localStorage.setItem('token', response.token);
      this.router.navigate(['/clientes']);
    }
  }

}
