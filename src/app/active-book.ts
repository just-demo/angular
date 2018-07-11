import {Injectable} from '@angular/core';

@Injectable()
export class ActiveBook {
  public id: string;
  public text: string;

  clear(): void {
    this.load(null, null);
  }

  load(id: string, text: string): void {
    this.id = id;
    this.text = text;
  }

  loaded(): boolean {
    return !!this.id;
  }
}
