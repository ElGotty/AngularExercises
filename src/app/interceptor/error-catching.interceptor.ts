
import {inject, Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { Router } from "@angular/router";

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const router = inject(Router);
        return next.handle(request)
        .pipe(
            catchError((error : HttpErrorResponse) => {
                if(error.status === 401){
                    router.navigate(['/login']);
                    
                }


                return throwError(() => new Error(error.message))

                
            })
        )
    }
}
