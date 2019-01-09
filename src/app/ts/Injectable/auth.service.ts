import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { share, map } from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}

  refreshToken(): Observable<string> {
    const refreshToken = this.cookieService.get('refresh_token');

    const data = JSON.stringify({
      'grant_type': 'refresh_token',
      'refresh_token': refreshToken,
      'client_id': 'mOHeCT4JNVSszc7071uoGzIgdbBuYocIGYxtw4XfKjs=',
      'client_secret': 'EUoAHrX4v9FxHzhBu4kJ5YhyBkpU5f1PZguQETSxl5hGwM9Lg1mRjWqn97YB92OFYUnC6OlN+DZEZo1aR5IA=='
    });
    return this.httpClient.post<any>(`${environment.api}/oauth/token`, data)
      .pipe(
        share(), // <========== YOU HAVE TO SHARE THIS OBSERVABLE TO AVOID MULTIPLE REQUEST BEING SENT SIMULTANEOUSLY
        map(res => {
          const token = res.get('access_token');
          const newRefreshToken = res.get('refresh_token');
          // store the new tokens
          this.cookieService.set('refresh_token', newRefreshToken);
          this.cookieService.set('access_token', token);
          return token;
        })
      );
  }
  getToken(): string {
    return this.cookieService.get('access_token');
  }
}
