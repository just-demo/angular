import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groups = {};

  constructor(private http: HttpClient) {
    this.initGroups();
  }

  private initGroups(): void {
    console.log('Init groups...');
    this.http.get<string[][]>('/groups').subscribe(groups => {
      // GROUPS
      groups.forEach(group => group.forEach(word => this.groups[word] = group));
      // this.groups = groups;
      // console.log(JSON.stringify(groups));
    });
  }

  getGroup(word: string): string[] {
    // console.log(JSON.stringify(this.translations)); /////////
    // TRANSLATIONS[word]
    // console.log(JSON.stringify(this.groups));
    // console.log(JSON.stringify(this.groups[word]));
    return this.groups[word] || [word];
  }
}
