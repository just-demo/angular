import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from '../message.service';
import {UserLogin} from '../user-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: UserLogin;

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.user = {};
  }

  login() {
    this.messageService.add(`Login with ${this.user.username}/${this.user.password}`);
  }

}
