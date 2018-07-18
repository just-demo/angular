import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes/heroes.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';

import {HeroSearchComponent} from './hero-search/hero-search.component';
import {BackendRequestInterceptor} from './backend-request-interceptor';
import {BookStatisticsComponent} from './book-statistics/book-statistics.component';
import {KeysPipe} from './pipes/keys.pipe';
import {ValuesPipe} from './pipes/values.pipe';
import {SumPipe} from './pipes/sum.pipe';
import {BookReaderComponent} from './book-reader/book-reader.component';
import {LoginDialogComponent} from './login-dialog/login-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialAllModule} from './material-all/material-all.module';
import {ActiveBook} from './active-book';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {WordDialogComponent} from './word-dialog/word-dialog.component';
import {QuizComponent} from './quiz/quiz.component';
import {IndexesPipe} from './pipes/indexes.pipe';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './book/book.component';
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {ChangePasswordDialogComponent} from './change-password-dialog/change-password-dialog.component';
import {SettingsAccountComponent} from './settings-account/settings-account.component';
import { QuizSettingsComponent } from './quiz-settings/quiz-settings.component';
import { QuizSettingsSelectedComponent } from './quiz-settings-selected/quiz-settings-selected.component';
import { QuizSettingsHiddenComponent } from './quiz-settings-hidden/quiz-settings-hidden.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroSearchComponent,
    BookStatisticsComponent,
    KeysPipe,
    ValuesPipe,
    SumPipe,
    BookReaderComponent,
    LoginDialogComponent,
    WordDialogComponent,
    QuizComponent,
    IndexesPipe,
    BooksComponent,
    BookComponent,
    ConfirmationDialogComponent,
    HomeComponent,
    SettingsComponent,
    ChangePasswordDialogComponent,
    SettingsAccountComponent,
    QuizSettingsComponent,
    QuizSettingsSelectedComponent,
    QuizSettingsHiddenComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialAllModule
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
//     HttpClientInMemoryWebApiModule.forRoot(
//       InMemoryDataService, {dataEncapsulation: false}
//     )

  ],
  // providers: [AuthService],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BackendRequestInterceptor, multi: true},
    ActiveBook
  ],
  entryComponents: [
    LoginDialogComponent,
    WordDialogComponent,
    ConfirmationDialogComponent,
    ChangePasswordDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
