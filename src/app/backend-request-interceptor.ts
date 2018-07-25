import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {AuthService} from './services/auth.service';
import {environment} from '../environments/environment';

@Injectable()
export class BackendRequestInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith('/assets/')) {
      return next.handle(req);
    }

    if (environment.production) {
      // Some services may expect an array and it will not break those ones that expect an object
      return of(new HttpResponse({body: []}));
    }

    req = req.clone({
      url: 'http://localhost:8080' + req.url,
      setHeaders: this.authService.getAuthHeaders() || {}
    });
    return next.handle(req);
  }
}
