import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { NoteItemComponent } from './home/note-item/note-item.component';
import { NoteCreateComponent } from './home/note-create/note-create.component';

import { AppRoutes } from './app.routes';
import { AuthGuard, UnAuthGuard } from './app.guard';

export const firebaseAppConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  storageBucket: '',
  messagingSenderId: ''
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NoteItemComponent,
    NoteCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig)
  ],
  providers: [
    AuthGuard,
    UnAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
