import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookEnterComponent} from './book-enter/book-enter.component';
import {BookUploadComponent} from './book-upload/book-upload.component';
import {BookStatisticsComponent} from './book-statistics/book-statistics.component';
import {ActiveBookGuard} from './active-book.guard';
import {StudyComponent} from './study/study.component';
import {BookReaderComponent} from './book-reader/book-reader.component';
import {BooksComponent} from './books/books.component';

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {path: 'books/:bookId', redirectTo: 'books/:bookId/pages/1', pathMatch: 'full'},
  {
    path: 'books/:bookId/pages/:pageId',
    component: BookReaderComponent,
    canActivate: [ActiveBookGuard],
    children: [
      // {path: '', redirectTo: 'upload', pathMatch: 'full'},
      {path: 'upload', component: BookUploadComponent},
      {path: 'enter', component: BookEnterComponent},
      {path: 'statistics', component: BookStatisticsComponent},
    ]
  },
  {path: 'study', component: StudyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
