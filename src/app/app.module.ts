import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BackendRequestInterceptor} from './backend-request-interceptor';
import {BookStatisticsComponent} from './book-statistics/book-statistics.component';
import {KeysPipe} from './pipes/keys.pipe';
import {ValuesPipe} from './pipes/values.pipe';
import {SumPipe} from './pipes/sum.pipe';
import {BookReaderComponent} from './book-reader/book-reader.component';
import {LoginDialogComponent} from './dialogs/login-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialAllModule} from './material-all/material-all.module';
import {ActiveBook} from './active-book';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {QuizComponent} from './quiz/quiz.component';
import {IndexesPipe} from './pipes/indexes.pipe';
import {BooksComponent} from './books/books.component';
import {BookComponent} from './book/book.component';
import {ConfirmationDialogComponent} from './dialogs/confirmation-dialog.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {ChangePasswordDialogComponent} from './dialogs/change-password-dialog.component';
import {UserDataComponent} from './user-data/user-data.component';
import {WordsHiddenComponent} from './words-hidden/words-hidden.component';
import {WordsSelectedComponent} from './words-selected/words-selected.component';
import {WordHiddenEnterDialogComponent} from './dialogs/word-hidden-enter-dialog.component';
import {IconbarComponent} from './iconbar/iconbar.component';
import {DataTableComponent} from './data-table/data-table.component';
import {WordTranslationEnterDialogComponent} from './dialogs/word-translation-enter-dialog.component';
import {RegistrationDialogComponent} from './dialogs/registration-dialog.component';
import {WordTranslationViewDialogComponent} from './dialogs/word-translation-view-dialog.component';
import {BooksDialogComponent} from './dialogs/books-dialog.component';
import {RouteReuseStrategy} from '@angular/router';
import {CustomRouteReuseStrategy} from './custom-route-reuse-strategy';
import {MessageDialogComponent} from './dialogs/message-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    BookStatisticsComponent,
    KeysPipe,
    ValuesPipe,
    SumPipe,
    BookReaderComponent,
    LoginDialogComponent,
    WordTranslationViewDialogComponent,
    QuizComponent,
    IndexesPipe,
    BooksComponent,
    BookComponent,
    ConfirmationDialogComponent,
    HomeComponent,
    SettingsComponent,
    ChangePasswordDialogComponent,
    WordsSelectedComponent,
    WordsHiddenComponent,
    UserDataComponent,
    WordHiddenEnterDialogComponent,
    IconbarComponent,
    DataTableComponent,
    WordTranslationEnterDialogComponent,
    RegistrationDialogComponent,
    BooksDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialAllModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: BackendRequestInterceptor, multi: true},
    ActiveBook
  ],
  entryComponents: [
    LoginDialogComponent,
    WordTranslationViewDialogComponent,
    ConfirmationDialogComponent,
    ChangePasswordDialogComponent,
    WordHiddenEnterDialogComponent,
    WordTranslationEnterDialogComponent,
    RegistrationDialogComponent,
    BooksDialogComponent,
    MessageDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
