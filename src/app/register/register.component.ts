import { Component, OnInit } from '@angular/core';
import {MessageService} from '../message.service';
import {UserLogin} from '../user-login';
import {UserRegistration} from '../user-registration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: UserRegistration;

  constructor(public messageService: MessageService) {}

  ngOnInit() {
    this.user = {};
  }

  register() {
    this.messageService.add(`Register as ${this.user.username}/${this.user.password}`);
  }

}
