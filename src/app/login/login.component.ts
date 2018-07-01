import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {Credentials} from '../credentials';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials: Credentials;

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.credentials = {} as Credentials;
  }

  login() {
    this.authenticationService.login(this.credentials);
  }
}
