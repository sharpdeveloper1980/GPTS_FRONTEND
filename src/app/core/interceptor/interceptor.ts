import { Injectable } from "@angular/core";
import { tap, catchError } from "rxjs/operators";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { HeaderService } from '../../shared/services/header.service'

@Injectable()
export class Interceptor implements HttpInterceptor {
    constructor(public router: Router, private headerService: HeaderService) { }
    //function which will be called for all http calls
    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        //how to update the request Parameters

        //logging the updated Parameters to browser's console
        console.log("before api call :", request);
        return next.handle(request).pipe(
            tap(
                event => {
                    //logging the http response to browser's console in case of a success
                    if (event instanceof HttpResponse) {
                        console.log(event)
                    }
                }),
            catchError((err: any) => {
                if (err instanceof HttpErrorResponse) {
                    try {
                        if (err.status === 404) {
                            this.headerService.loaderFunction(false);
                            console.log(err);
                            this.router.navigate(['error404']);
                        } else if (err.status === 500) {
                            this.headerService.loaderFunction(false);
                            this.router.navigate(['error500']);
                        }
                    } catch (e) {
                        console.log(e);
                    }
                }
                return throwError(err);
            })
        );
    }
}