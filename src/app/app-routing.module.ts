import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookStatisticsComponent} from './book-statistics/book-statistics.component';
import {ActiveBookGuard} from './active-book.guard';
import {StudyComponent} from './study/study.component';
import {BookReaderComponent} from './book-reader/book-reader.component';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './book/book.component';

const routes: Routes = [
  {path: 'books', component: BooksComponent},
  {
    path: 'books/:bookId',
    component: BookComponent,
    canActivate: [ActiveBookGuard],
    children: [
      {path: '', redirectTo: 'pages/1', pathMatch: 'full'},
      {path: 'pages/:pageId', component: BookReaderComponent},
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
