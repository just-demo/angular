import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authHeaders: { [header: string]: string } = null;
  private authUser: string = null;

  constructor(
    private http: HttpClient,
  ) {
  }

  login(username: string, password: string): Observable<Object> {
    return this.http.post('/auth', {
      username: username,
      password: password
    }).pipe(
      map(authHeaders => this.setAuthUser(username, authHeaders))
    );
  }

  register(username: string, password: string): Observable<Object> {
    const response = this.http.put('/auth', {
      username: username,
      password: password
    }).pipe(
      map(authHeaders => this.setAuthUser(username, authHeaders))
    );
    response.subscribe();
    return response;
  }

  changePassword(oldPassword: string, newPassword: string): Observable<Object> {
    const response = this.http.post<any>('/auth/' + this.getAuthUser() + '/password', {
      oldPassword: oldPassword,
      newPassword: newPassword
    }).pipe(
      map(authHeaders => this.setAuthUser(this.getAuthUser(), authHeaders))
    );
    response.subscribe();
    return response;
  }

  delete(): Observable<Object> {
    const response = this.http.delete<any>('/auth/' + this.getAuthUser())
      .pipe(
        map(ignored => this.setAuthUser(null, null))
      );
    response.subscribe();
    return response;
  }

  logout(): void {
    this.setAuthUser(null, null);
  }

  isAuthenticated(): boolean {
    return !!this.authHeaders;
  }

  getAuthHeaders(): { [header: string]: string } {
    return this.authHeaders;
  }

  getAuthUser() {
    return this.authUser;
  }

  // TODO: find a better function like "visit" instead of "map" (see usages of this function for details)
  // subscribe is not applicable here because another subsequent subscriber needs username and authHeaders be initialized
  private setAuthUser(username: string, authHeaders: any): any {
    this.authUser = username;
    this.authHeaders = authHeaders;
    return this.authHeaders;
  }
}
