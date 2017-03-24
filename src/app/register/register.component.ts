import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth, AngularFireDatabase } from 'angularfire2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  loading: boolean;
  error: string;
  _errorTimeOut;
  user = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private router: Router, private auth: AngularFireAuth, private database: AngularFireDatabase) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  register() {
    this.loading = true;
    if (this.error) {
      this.error = '';
    }
    if (this._errorTimeOut) {
      clearTimeout(this._errorTimeOut);
      this._errorTimeOut = null;
    }
    this.auth.createUser(this.user)
      .then(auth => {
        console.log('Login:auth', auth);
        return this.database.object(`/users/${auth.uid}`).set({
          name: this.user.name,
          image: 'assets/avatar.png',
          email: this.user.email,
        });
      })
      .then(user => {
        console.log('User:created', user);
        this.loading = false;
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log('Login:error', error);
        this.error = error && error.message || 'Login Error';
        this._errorTimeOut = setTimeout(_ => {
          this.error = '';
          this._errorTimeOut = null;
        }, 5000);
        this.loading = false;
      });
  }

}
