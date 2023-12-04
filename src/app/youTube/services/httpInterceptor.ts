import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ShortUrlInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<string>, next: HttpHandler): Observable<HttpEvent<string>> {
        const modifiedReq = req.clone({
            params: req.params.set( 'key', 'AIzaSyCMFGPQRRaXj6uji1J4k4ZS6SF6BSFiBuM')
        });

        return next.handle(modifiedReq);
    }
}