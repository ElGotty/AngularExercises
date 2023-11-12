import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Cliente } from './cliente';
import { ClientePage } from './clientePage';
import { CLIENTES } from './clientes.json';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndpoint:string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    "Authorization" : 'Bearer '+localStorage.getItem('token')
  });

  constructor(private http: HttpClient, private router: Router) { }

  getClientes(pageNumber:number, pageSize:number): Observable<ClientePage> {
    
    let params = new HttpParams();
    params = params.append("pageNumber", pageNumber);
    params = params.append("pageSize", pageSize);

    return  this.http.get<ClientePage>(this.urlEndpoint,{headers:this.httpHeaders,params:params});
    // return  this.http.get(this.urlEndpoint).pipe(
    //   map((response) => response as Cliente[])
    // );
  }

  create(cliente:Cliente) : Observable<any>{
    return this.http.post<Cliente>(this.urlEndpoint,cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {

        if(e.status == 400){
          return throwError(() => e);
        }

        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => Error(e));
      })
    )
  }

  getCliente(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => Error(e));
      })
    )
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      map((response : any) => response.cliente as Cliente),
      catchError(e => {

        if(e.status == 400){
          return throwError(() => e);
        }
        
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => Error(e));
      })
    )
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`,{headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => Error(e));
      })
    )
  }

}
