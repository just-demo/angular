import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {ActiveBook} from './active-book';

@Injectable({
  providedIn: 'root'
})
export class ActiveBookGuard implements CanActivate {
  constructor(private activeBook: ActiveBook) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log('guard: ...');
    console.log(next);
    console.log(this.activeBook.loaded());
    return this.activeBook.loaded();
  }
}
