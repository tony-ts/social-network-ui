import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {UserService} from '../../services/user.service';
import {FriendFullInfo} from '../../domain/FriendFullInfo';
import {MatSnackBar} from '@angular/material/snack-bar';
import {PageEvent} from '@angular/material/paginator';
import {Router} from '@angular/router';

@Component({
  selector: 'app-friends-search',
  templateUrl: './friends-search.component.html',
  styleUrls: ['./friends-search.component.css']
})
export class FriendsSearchComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
  }

  searchFormControl = new FormControl('');

  searchSubscription: Subscription = new Subscription();

  users: FriendFullInfo[] = [];

  length = 100;
  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;


  ngOnInit(): void {
    this.searchSubscription.add(this.searchFormControl.valueChanges.pipe(
      debounceTime(500),
    ).subscribe(value => this.updateUsers(value, this.pageIndex, this.pageSize)));
    this.updateUsers('', this.pageIndex, this.pageSize);
  }

  updateUsers(name: string, pageIndex: number, pageSize: number) {
    this.userService.findUsersByName(name, this.pageIndex, this.pageSize)
      .subscribe(
        response => {
          this.users = response.result;
          this.length = response.total;
        },
        _ => this.snackBar.open('Unexpected error, can\' get users!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  handlePageEvent(pageEvent: PageEvent): PageEvent {
    console.log(pageEvent);
    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    // force value change event
    this.searchFormControl.patchValue(this.searchFormControl.value);
    return pageEvent;
  }

  chooseProfile(id: number): Promise<boolean> {
    return this.router.navigateByUrl('user/' + id);
  }

}
