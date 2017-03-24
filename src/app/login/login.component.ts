import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  error: string;
  _errorTimeOut;
  user = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private auth: AngularFireAuth) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

  login() {
    this.loading = true;
    if (this.error) {
      this.error = '';
    }
    if (this._errorTimeOut) {
      clearTimeout(this._errorTimeOut);
      this._errorTimeOut = null;
    }
    this.auth.login(this.user)
      .then(auth => {
        console.log('Login:auth', auth);
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
