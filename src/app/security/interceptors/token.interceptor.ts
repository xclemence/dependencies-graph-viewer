import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakService } from 'keycloak-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly keycloakService: KeycloakService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.keycloakService.getKeycloakInstance()?.token;

    if (!token) {
      return next.handle(request);
    }

    const headers = request.headers.set('Authorization', `Bearer ${token}`);
    const newRequest = request.clone({ headers });

    return next.handle(newRequest);
  }
}
