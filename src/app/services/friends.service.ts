import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {IUserFriendship} from '../domain/IUserFriendship';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {IPageableResponse} from '../domain/IPageableResponse';
import {IFriendship} from '../domain/IFriendship';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  findFriends(page: number, size: number): Observable<IPageableResponse<IUserFriendship>> {
    console.log('Calling findFriends page:', page, ' size:', size);
    return this.httpClient.get<IPageableResponse<IUserFriendship>>(environment.apiUrl + '/users/me/friends', {
      params: {
        'page': page.toString(),
        'size': size.toString()
      }
    })
      .pipe(
        tap(
          response => console.log('Find friends response:', response),
          (error: HttpErrorResponse) => console.log('Find friends error:', error)
        )
      );
  }

  findFriendship(userId: string): Observable<IFriendship> {
    console.log('Find friendship with userId:', userId);
    return this.httpClient.get<IFriendship>(environment.apiUrl + '/users/me/friends/status', {
      params: {
        'userId': userId
      }
    })
      .pipe(
        tap(
          response => console.log('Find friendship response:', response),
          (error: HttpErrorResponse) => console.log('Find friendship error:', error)
        )
      );
  }

  findIncomingRequests(page: number, size: number): Observable<IPageableResponse<IUserFriendship>> {
    console.log('Fiend incoming friend requests page:', page, ' size:', size);
    return this.httpClient.get<IPageableResponse<IUserFriendship>>(environment.apiUrl + '/users/me/friends/incoming', {
      params: {
        'page': page.toString(),
        'size': size.toString()
      }
    })
      .pipe(
        tap(
          response => console.log('Find friends response:', response),
          (error: HttpErrorResponse) => console.log('Find friends error:', error)
        )
      );
  }

  endFriendship(friendshipId: number): Observable<void> {
    console.log('Delete friendship with friendship id:', friendshipId);
    return this.httpClient.delete<void>(environment.apiUrl + '/users/me/friends/' + friendshipId)
      .pipe(
        tap(
          response => console.log('Delete friendship response:', response),
          (error: HttpErrorResponse) => console.log('Find friendship error:', error)
        )
      );
  }

  sendFriendshipRequest(userId: number): Observable<void> {
    console.log('Send friendship request with user id:', userId);
    return this.httpClient.post<void>(environment.apiUrl + '/users/' + userId + '/friend-request', null)
      .pipe(
        tap(
          response => console.log('Send friendship  request response:', response),
          (error: HttpErrorResponse) => console.log('Send friendship request error:', error)
        )
      );
  }

  acceptFriendship(friendshipId: number): Observable<void> {
    console.log('Accept friendship with friendship id:', friendshipId);
    return this.httpClient.post<void>(environment.apiUrl + '/users/me/friend-request/' + friendshipId + '/accept', null)
      .pipe(
        tap(
          response => console.log('Accept friendship response:', response),
          (error: HttpErrorResponse) => console.log('Accept friendship error:', error)
        )
      );
  }
}
