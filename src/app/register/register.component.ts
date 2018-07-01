import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {Credentials} from '../credentials';
import {AuthenticationService} from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: Credentials;

  constructor(public authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.credentials = {} as Credentials;
  }

  register() {
    this.authenticationService.register(this.credentials);
  }

}
