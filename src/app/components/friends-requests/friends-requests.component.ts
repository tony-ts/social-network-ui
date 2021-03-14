import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {IUserFriendship} from '../../domain/IUserFriendship';
import {Subscription} from 'rxjs';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-friends-requests',
  templateUrl: './friends-requests.component.html',
  styleUrls: ['./friends-requests.component.css']
})
export class FriendsRequestsComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar
  ) {
  }

  incomingRequests: IUserFriendship[] = [];

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageIndex = 0;

  incomingRequestsSubscription: Subscription;

  ngOnInit(): void {
    this.updateIncomingRequests(0, 10);
  }

  ngOnDestroy(): void {
    this.incomingRequestsSubscription?.unsubscribe();
  }

  updateIncomingRequests(pageIndex: number, pageSize: number) {
    this.incomingRequestsSubscription?.unsubscribe();
    this.incomingRequestsSubscription = this.friendsService.findIncomingRequests(pageIndex, pageSize)
      .subscribe(
        response => {
          this.incomingRequests = response.result;
          this.length = response.total;
        },
        _ => this.snackBar.open('Unexpected error, can\' get incoming friend requests!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  handlePageEvent(pageEvent: PageEvent): PageEvent {
    console.log(pageEvent);

    this.pageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
    this.updateIncomingRequests(pageEvent.pageIndex, pageEvent.pageSize);
    return pageEvent;
  }

  chooseProfile(id: number): Promise<boolean> {
    return this.router.navigateByUrl('user/' + id);
  }
}
