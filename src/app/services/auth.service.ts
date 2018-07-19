import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authHeaders = null;
  private authUser = null;

  constructor(
    private http: HttpClient,
  ) {
  }

  login(username: string, password: string): Observable<Object> {
    const response = this.http.post('/auth', new Credentials(username, password));
    response.subscribe(authHeaders => this.onSuccessfulLogin(username, authHeaders));
    return response;
  }

  register(username: string, password: string): Observable<Object> {
    const response = this.http.put('/auth', new Credentials(username, password));
    response.subscribe(authHeaders => this.onSuccessfulLogin(username, authHeaders));
    return response;
  }

  private onSuccessfulLogin(username: string, authHeaders: any): void {
    this.authUser = username;
    this.authHeaders = authHeaders;
  }

  changePassword(oldPassword: string, newPassword: string): Observable<Object> {
    const response = this.http.post('/auth/password', {
      oldPassword: oldPassword,
      newPassword: newPassword
    });
    response.subscribe(authHeaders => {
      this.authHeaders = authHeaders;
    });
    return response;
  }

  logout(): void {
    this.authHeaders = null;
    this.authUser = null;
  }

  isAuthenticated(): boolean {
    return !!this.authHeaders;
  }

  getAuthHeaders() {
    return this.authHeaders;
  }

  getAuthUser() {
    return this.authUser;
  }
}

export class Credentials {
  constructor(username: string, password: string) {
  }
}
