import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Credentials} from '../credentials';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authHeaders = null;
  private authUser = null;

  constructor(
    private http: HttpClient
  ) {
    // TODO: remove hardcoded values
    this.authUser = 'test.user';
    this.authHeaders = {};
  }

  login(credentials: Credentials): Observable<Object> {
    const response = this.http.post('/auth', credentials);
    response.subscribe(authHeaders => {
      this.authUser = credentials.username;
      this.authHeaders = authHeaders;
    });
    return response;
  }

  register(credentials: Credentials): Observable<Object> {
    const response = this.http.put('/auth', credentials);
    response.subscribe(authHeaders => {
      this.authUser = credentials.username;
      this.authHeaders = authHeaders;
    });
    return response;
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
