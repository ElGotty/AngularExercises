import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, firstValueFrom, throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private httpClient = inject(HttpClient);
  private baseUrl: String;

  constructor() { 
    this.baseUrl = 'http://localhost:8080/auth';
  }

  register(formvalue : any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/register`,formvalue)
    )
  }

  login(formvalue : any){
    return firstValueFrom(
      this.httpClient.post<any>(`${this.baseUrl}/login`,formvalue).pipe(
        catchError(e => {
          Swal.fire(e.error.response, e.error.error, 'error');
          return throwError(() => Error(e));
        })
      )
    )
  }

  isLogged(): boolean{
    return localStorage.getItem('token') ? true : false;
  }

}
