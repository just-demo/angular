import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
import {Credentials} from './credentials';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authentication = null;

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  login(credentials: Credentials) {
    this.messageService.add(`Login with ${credentials.username}/${credentials.password}`);
    this.http.post<Credentials>('http://localhost:8080/auth', credentials)
      .subscribe(authentication => this.authentication = authentication);
  }

  register(credentials: Credentials) {
    this.messageService.add(`Register user with ${credentials.username}/${credentials.password}`);
    this.http.put<Credentials>('http://localhost:8080/auth', credentials).subscribe();
  }

  logout() {
    this.authentication = null;
  }

  isAuthenticated(): boolean {
    return !!this.authentication;
  }

  getAuthentication() {
    return this.authentication;
  }
}
