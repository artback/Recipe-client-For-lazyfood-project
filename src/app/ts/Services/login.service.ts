import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Injectable()
export class LoginService {
  constructor (private httpClient: HttpClient, private cookieService: CookieService, private router: Router) {}
  logIn(user): Observable<any> {
    const data = ({
      'grant_type': 'password',
      'username': user.username,
      'password': user.password,
      'client_id': 'mOHeCT4JNVSszc7071uoGzIgdbBuYocIGYxtw4XfKjs=',
      'client_secret': 'EUoAHrX4v9FxHzhBu4kJ5YhyBkpU5f1PZguQETSxl5hGwM9Lg1mRjWqn97YB92OFYUnC6OlN+DZEZo1aR5IA=='
    });
    return this.httpClient.post<any>(`${environment.api}/oauth/token`, data).pipe(map( res => {
        if (res && res.access_token) {
          this.cookieService.set('access_token', res.access_token);
          this.cookieService.set('username', user.username);
          this.cookieService.set('refresh_token', res.refresh_token);
        }
        return res;
      })
    );
  }
  logout(): void {
    this.router.navigate(['']).then();
    this.cookieService.delete('username');
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
  }
  getUserName(): string {
   return this.cookieService.get('username');
  }
  isLoggedIn(): boolean {
    return this.cookieService.check('access_token');
  }

}

