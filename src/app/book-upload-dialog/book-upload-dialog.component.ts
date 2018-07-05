import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-book-upload-dialog',
  templateUrl: './book-upload-dialog.component.html',
  styleUrls: ['./book-upload-dialog.component.css']
})
export class BookUploadDialogComponent implements OnInit {
  text: string;

  constructor(private dialogRef: MatDialogRef<AppComponent>) {
  }

  ngOnInit(): void {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(ignored => {
      console.log('Handling backdropClick...');
      // this.dialogRef.close();
    });
  }

  uploadFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      console.log('Reading file...');
      this.dialogRef.close(reader.result);
    };
    reader.readAsText(file);
  }

  uploadText(text: string) {
    this.dialogRef.close(text);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
