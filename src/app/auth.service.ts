import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Credentials} from './credentials';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authHeaders = null;
  private authUser = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
    // TODO: remove hardcoded values
    this.authUser = 'test.user';
    this.authHeaders = {};
  }

  login(credentials: Credentials): Observable<Object> {
    this.messageService.add(`Login with ${credentials.username}/${credentials.password}`);
    const response = this.http.post('/auth', credentials);
    response.subscribe(authHeaders => {
      this.authUser = credentials.username;
      this.authHeaders = authHeaders;
    });
    return response;
  }

  register(credentials: Credentials) {
    this.messageService.add(`Register user with ${credentials.username}/${credentials.password}`);
    this.http.put('/auth', credentials).subscribe();
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
