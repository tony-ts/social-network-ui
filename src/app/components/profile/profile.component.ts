import {Component, OnDestroy, OnInit} from '@angular/core';
import {FriendFullInfo} from '../../domain/FriendFullInfo';
import {ActivatedRoute, Router} from '@angular/router';
import {FriendsService} from '../../services/friends.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../services/user.service';
import {DateUtils} from '../../domain/DateUtils';
import {FriendshipStatus} from '../../domain/FriendshipStatus';
import {Subscription} from 'rxjs';
import {IFriendship} from '../../domain/IFriendship';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private userService: UserService,
    private friendsService: FriendsService,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
  }

  user: FriendFullInfo;
  userAge: number;
  friendshipStatus?: FriendshipStatus;
  FriendshipStatus = FriendshipStatus;
  userSubscription: Subscription;
  friendshipSubscription: Subscription;
  friendship: IFriendship;

  sendFriendshipSubscription: Subscription;
  declineFriendshipSubscription: Subscription;
  acceptFriendshipSubscription: Subscription;
  endFriendshipSubscription: Subscription;

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('looking at profile with id:', userId);
    this.userSubscription = this.userService.findUserById(userId)
      .subscribe(
        user => {
          this.user = user;
          this.userAge = DateUtils.calculateAge(user.birthdate);
        },
        _ => this.snackBar.open('Unexpected error, can\' get user profile!', 'Dismiss', {
          duration: 3000
        })
      );
    this.updateFriendship(userId);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.friendshipSubscription?.unsubscribe();
    this.sendFriendshipSubscription?.unsubscribe();
    this.declineFriendshipSubscription?.unsubscribe();
    this.acceptFriendshipSubscription?.unsubscribe();
    this.endFriendshipSubscription?.unsubscribe();
  }

  endFriendship(): void {
    if (!this.friendship) {
      this.snackBar.open('There is no friendship between you!', 'Dismiss', {
        duration: 3000
      });
      return;
    }
    this.endFriendshipSubscription?.unsubscribe();
    this.endFriendshipSubscription = this.friendsService.endFriendship(this.friendship.id)
      .subscribe(
        _ => this.updateFriendship(this.user.id.toString()),
        _ => this.snackBar.open('End friendship error!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  acceptFriendship(): void {
    if (!(FriendshipStatus.INCOMING == this.friendshipStatus)) {
      this.snackBar.open('There is no incoming friendship request to you!', 'Dismiss', {
        duration: 3000
      });
      return;
    }
    this.acceptFriendshipSubscription?.unsubscribe();
    this.acceptFriendshipSubscription = this.friendsService.acceptFriendship(this.friendship.id)
      .subscribe(
        _ => this.updateFriendship(this.user.id.toString()),
        _ => this.snackBar.open('Accept friendship error!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  cancelFriendshipRequest(): void {
    if (!(FriendshipStatus.PENDING == this.friendshipStatus)) {
      this.snackBar.open('There is no sent friendship request by you!', 'Dismiss', {
        duration: 3000
      });
      return;
    }
    this.declineFriendshipSubscription?.unsubscribe();
    this.declineFriendshipSubscription = this.friendsService.endFriendship(this.friendship.id)
      .subscribe(
        _ => this.updateFriendship(this.user.id.toString()),
        _ => this.snackBar.open('Decline friendship error!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  sendFriendshipRequest(): void {
    if (this.friendshipStatus) {
      this.snackBar.open('There is ' + this.friendshipStatus + ' relationship between you!', 'Dismiss', {
        duration: 3000
      });
      return;
    }
    this.sendFriendshipSubscription?.unsubscribe();
    this.sendFriendshipSubscription = this.friendsService.sendFriendshipRequest(this.user.id)
      .subscribe(
        _ => this.updateFriendship(this.user.id.toString()),
        _ => this.snackBar.open('Send friendship request error!', 'Dismiss', {
          duration: 3000
        })
      );
  }

  private updateFriendship(userId: string) {
    this.friendshipSubscription?.unsubscribe();
    this.friendshipSubscription = this.friendsService.findFriendship(userId)
      .subscribe(
        friendship => {
          if (friendship == null) {
            this.friendshipStatus = null;
            return;
          }
          this.friendship = friendship;
          if (friendship.fromUser.toString() === userId
            && friendship.status === FriendshipStatus[FriendshipStatus.PENDING]) {
            // we was requested to be friends
            this.friendshipStatus = FriendshipStatus.INCOMING;
          } else {
            this.friendshipStatus = FriendshipStatus[friendship.status];
          }
          console.log('Friendship status', FriendshipStatus[this.friendshipStatus]);
        },
        _ => this.snackBar.open('Unexpected error, can\' get friendship!', 'Dismiss', {
          duration: 3000
        })
      );
  }
}
