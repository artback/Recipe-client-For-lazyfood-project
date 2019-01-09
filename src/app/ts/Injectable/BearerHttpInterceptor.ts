
import {throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';

import {take, filter, catchError, switchMap, finalize} from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse,
  HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';
import {LoginService} from '../Services';

@Injectable()
export class BearerHttpInterceptor implements HttpInterceptor {

  constructor(
  private injector: Injector,
  private loginService: LoginService,
  private authService: AuthService
  ) {}

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  static addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token }});
  }


  static logoutUser() {
    // Route to the login page (implementation up to you)
    return observableThrowError('');
  }

  static handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return BearerHttpInterceptor.logoutUser();
    }

    return observableThrowError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent
    | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const authService = this.injector.get(AuthService);

    return next.handle(BearerHttpInterceptor.addToken(req, authService.getToken())).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return BearerHttpInterceptor.handle400Error(error);
            case 401:
              return this.handle401Error(req, next);
            default:
              return observableThrowError(error);
          }
        } else {
          return observableThrowError(error);
        }
      }));
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      // Reset here so that the following requests wait until the token
      // comes back from the refreshToken call.
      this.tokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        switchMap((newToken: string) => {
          if (newToken) {
            this.tokenSubject.next(newToken);
            return next.handle(BearerHttpInterceptor.addToken(req, newToken));
          }

          // If we don't get a new token, we are in trouble so logout.
          return BearerHttpInterceptor.logoutUser();
        }),
        catchError(() => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          return BearerHttpInterceptor.logoutUser();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        }), );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(BearerHttpInterceptor.addToken(req, token));
        }), );
    }
  }
}

