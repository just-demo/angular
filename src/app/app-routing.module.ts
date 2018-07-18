import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookStatisticsComponent} from './book-statistics/book-statistics.component';
import {ActiveBookGuard} from './active-book.guard';
import {QuizComponent} from './quiz/quiz.component';
import {BookReaderComponent} from './book-reader/book-reader.component';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './book/book.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {UserDataComponent} from './user-data/user-data.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'books', component: BooksComponent},
  {
    path: 'books/:bookId',
    component: BookComponent,
    canActivate: [ActiveBookGuard],
    children: [
      {path: '', redirectTo: 'pages', pathMatch: 'full'},
      {path: 'pages', redirectTo: 'pages/1', pathMatch: 'full'},
      {path: 'pages/:pageId', component: BookReaderComponent},
      {path: 'statistics', component: BookStatisticsComponent},
    ]
  },
  {path: 'quiz', redirectTo: 'quiz/uniform', pathMatch: 'full'},
  {path: 'quiz/:mode', component: QuizComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'data', redirectTo: 'data/words', pathMatch: 'full'},
  {path: 'data/:tab', component: UserDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
