import {Injectable} from '@angular/core';
import {ProfileFullInfo} from '../domain/ProfileFullInfo';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {FriendFullInfo} from '../domain/FriendFullInfo';
import {IPageableResponse} from '../domain/IPageableResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getCurrentUser(): Observable<ProfileFullInfo> {
    console.log('Calling getCurrentUser');
    return this.httpClient.get<ProfileFullInfo>(environment.apiUrl + '/users/me')
      .pipe(
        tap(
          response => response,
          (error: HttpErrorResponse) => console.log('Get current user error:', error)
        )
      );
  }

  updateCurrentUser(profileFullInfo: ProfileFullInfo): Observable<any> {
    console.log('Update user profile with id:', profileFullInfo.id);
    return this.httpClient.put(environment.apiUrl + '/users/me', profileFullInfo)
      .pipe(
        tap(
          response => response,
          (error: HttpErrorResponse) => console.log('Update user profile error:', error)
        )
      );
  }

  findUsersByName(name: string, page: number, size: number): Observable<IPageableResponse<FriendFullInfo>> {
    console.log('Find users by name', name, ', page:', page, ' size:', size);
    return this.httpClient.get<IPageableResponse<FriendFullInfo>>(environment.apiUrl + '/users/search', {
      params: {
        'name': name,
        'page': page.toString(),
        'size': size.toString()
      }
    })
      .pipe(
        tap(
          response => console.log('Find users response:', response)
        ),
        tap(
          response => response,
          (error: HttpErrorResponse) => console.log('Fiend users by name error:', error)
        )
      );
  }

  findUserById(id: string): Observable<FriendFullInfo> {
    console.log('Find user by id', id);
    return this.httpClient.get<FriendFullInfo>(environment.apiUrl + '/users/' + id)
      .pipe(
        tap(
          (response: FriendFullInfo) => console.log('Find user by id response:', response)
        ),
        tap(
          response => response,
          (error: HttpErrorResponse) => console.log('Fiend user by id error:', error)
        ),
        map(response => {
          response.birthdate = new Date(response.birthdate)
          return response;
        })
      );
  }
}
