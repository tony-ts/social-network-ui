import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {ProfileFullInfo} from '../../domain/ProfileFullInfo';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CustomValidators} from '../../validators/customValidators';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
  }

  error: string;
  disabled = false;
  currentUser: ProfileFullInfo;

  currentUserForm = new FormGroup({
    id: new FormControl({value: '', disabled: this.disabled, hidden: true}, [
      Validators.required
    ]),
    email: new FormControl({value: '', disabled: this.disabled}, [
      Validators.email,
      Validators.required
    ]),
    firstName: new FormControl({value: '', disabled: this.disabled}, [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.cannotContainSpace
    ]),
    lastName: new FormControl({value: '', disabled: this.disabled}, [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.cannotContainSpace
    ]),
    birthdate: new FormControl({value: '', disabled: this.disabled}, [
      Validators.required
    ]),
    gender: new FormControl({value: '', disabled: this.disabled}, [
      Validators.required,
      CustomValidators.cannotContainSpace
    ]),
    interests: new FormControl({value: '', disabled: this.disabled}, [
      Validators.required,
      Validators.minLength(3)
    ]),
    city: new FormControl({value: '', disabled: this.disabled}, [
      Validators.required,
      Validators.minLength(3),
      CustomValidators.cannotContainSpace
    ])
  });

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .subscribe(
        user => this.currentUserForm.patchValue(user),
        _ => this.snackBar.open('Unexpected error, can\' get your profile info!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  get formControls() {
    return this.currentUserForm.controls;
  }

  update(): void {
    if (this.currentUserForm.invalid) {
      console.error('register fields has invalid values');
      return;
    }
    this.userService.updateCurrentUser(this.currentUserForm.value)
      .subscribe(
        _ => this.snackBar.open('Successfully updated!', 'Dismiss', {
          duration: 2000
        }),
        _ => this.snackBar.open('Error please try again later!', 'Dismiss', {
          duration: 2000
        })
      );
  }

}
