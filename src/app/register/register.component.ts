import {Component, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {Credentials} from '../credentials';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  credentials: Credentials;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.credentials = {} as Credentials;
  }

  register() {
    this.authService.register(this.credentials);
  }

}
