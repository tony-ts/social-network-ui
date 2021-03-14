import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageEvent} from '@angular/material/paginator';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IUserFriendship} from '../../domain/IUserFriendship';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar
  ) {
  }

  friends: IUserFriendship[] = [];

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  friendsSubscription: Subscription;

  ngOnInit(): void {
    this.updateFriends(0, 10);
  }

  updateFriends(pageIndex: number, pageSize: number) {
    this.friendsSubscription?.unsubscribe();
    this.friendsSubscription = this.friendsService.findFriends(pageIndex, pageSize)
      .subscribe(
        response => {
          this.friends = response.result;
          this.length = response.total;
        },
        _ => this.snackBar.open('Unexpected error, can\' get your friends!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  handlePageEvent(pageEvent: PageEvent): PageEvent {
    console.log(pageEvent);

    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.updateFriends(pageEvent.pageIndex, pageEvent.pageSize);
    return pageEvent;
  }

  chooseProfile(id: number): Promise<boolean> {
    return this.router.navigateByUrl('user/' + id);
  }

  ngOnDestroy(): void {
    this.friendsSubscription?.unsubscribe();
  }
}
