import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/customValidators';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  error: string;

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.minLength(4),
      Validators.required
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.cannotContainSpace
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.cannotContainSpace
    ]),
    birthdate: new FormControl('', [
      Validators.required
    ]),
    gender: new FormControl('', [
      Validators.required,
      CustomValidators.cannotContainSpace
    ]),
    interests: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    city: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.cannotContainSpace
    ])
  });


  get formControls(): { [p: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  signup(): void {
    if (this.signupForm.invalid) {
      console.error('register fields has invalid values');
      return;
    }

    this.authService.signup(this.signupForm.value)
      .subscribe(
        _ => this.router.navigateByUrl('/login'),
        _ => this.error = 'Error, please try again later.'
      );
  }

  ngOnInit(): void {
    // no op
  }
}
