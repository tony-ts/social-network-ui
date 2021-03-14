import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  error: string;
  authSubscription: Subscription;

  emailForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(4),
      Validators.required
    ])
  });

  ngOnInit(): void {
    // no op
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
  }

  get email(): FormControl {
    return this.emailForm.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.emailForm.get('password') as FormControl;
  }

  login(): void {
    if (this.emailForm.invalid) {
      console.error('login fields has invalid values');
      return;
    }

    this.authSubscription?.unsubscribe();
    this.authSubscription = this.authService.authenticate({
      email: this.email.value,
      password: this.password.value
    }).subscribe(
      _ => this.router.navigateByUrl('/home'),
      _ => this.error = 'Error, please try again later.'
    );
  }


}
