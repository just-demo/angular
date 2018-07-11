import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {BookComponent} from './book/book.component';
import {BookEnterComponent} from './book-enter/book-enter.component';
import {BookUploadComponent} from './book-upload/book-upload.component';
import {BookStatisticsComponent} from './book-statistics/book-statistics.component';
import {ActiveBookGuard} from './active-book.guard';
import {StudyComponent} from './study/study.component';
import {BookReaderComponent} from './book-reader/book-reader.component';

const routes: Routes = [
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
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'detail/:id', component: HeroDetailComponent},
  // {path: '', redirectTo: 'book', pathMatch: 'full'},
  {path: 'study', component: StudyComponent},
  {path: 'heroes', component: HeroesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
