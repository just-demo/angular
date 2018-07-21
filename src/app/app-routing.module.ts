import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookStatisticsComponent} from './book-statistics/book-statistics.component';
import {ActiveBookGuard} from './book/active-book.guard';
import {QuizComponent} from './quiz/quiz.component';
import {BookReaderComponent} from './book-reader/book-reader.component';
import {BookComponent} from './book/book.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {UserDataComponent} from './user-data/user-data.component';
import {SettingsGuard} from './settings/settings.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'books/:bookId',
    component: BookComponent,
    // It is not possible to navigate to a particular book directly via a link
    // because the user will not be logged in and the content of the book could not be loaded anyway
    canActivate: [ActiveBookGuard],
    children: [
      // TODO: why does't redirection via 'pages' work here?
      {path: '', redirectTo: 'pages/1', pathMatch: 'full'},
      {path: 'pages', redirectTo: 'pages/1', pathMatch: 'full'},
      {path: 'pages/:pageId', component: BookReaderComponent},
      {path: 'statistics', component: BookStatisticsComponent},
    ]
  },
  {path: 'quiz', redirectTo: 'quiz/uniform', pathMatch: 'full'},
  {path: 'quiz/:mode', component: QuizComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [SettingsGuard]},
  {path: 'data', redirectTo: 'data/words', pathMatch: 'full'},
  {path: 'data/:tab', component: UserDataComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
