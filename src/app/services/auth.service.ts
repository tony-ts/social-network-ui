import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LocalStorageDecorator} from '../components/storage/local-storage.decorator';
import {LocalStorageItem} from '../components/storage/LocalStorageItem';
import {ILoginInfo} from '../domain/ILoginInfo';
import {ISignupInfo} from '../domain/ISignupInfo';
import {ILoginResponse} from '../domain/ILoginResponse';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private jwtHelperService: JwtHelperService) {
    this.init();
  }

  accessToken?;

  init(): void {
    this.accessToken = LocalStorageDecorator.getItem(LocalStorageItem.ACCESS_TOKEN);
    if (this.accessToken !== null) {
      console.log('set token on init with type', LocalStorageItem.ACCESS_TOKEN);
    }
  }

  isAuthenticated(): boolean {
    const tokenExpired: boolean = this.jwtHelperService.isTokenExpired(this.accessToken);
    if (tokenExpired) {
      console.log('access_token expired');
    }
    return !tokenExpired;
  }


  authenticate(loginInfo: ILoginInfo): Observable<ILoginResponse> {
    console.log('Calling authenticate for email: ', loginInfo.email);

    LocalStorageDecorator.removeItem(LocalStorageItem.ACCESS_TOKEN);

    return this.httpClient.post<ILoginResponse>(environment.apiUrl + '/auth/login', loginInfo)
      .pipe(
        tap(
          (response: ILoginResponse) => this.accessToken = response.accessToken
        ),
        tap(
          (response: ILoginResponse) => LocalStorageDecorator.setItem(LocalStorageItem.ACCESS_TOKEN, response.accessToken),
          (error: HttpErrorResponse) => console.log('Authentication error:', error)
        )
      );
  }

  signup(registerInfo: ISignupInfo): Observable<ISignupInfo> {
    console.log('Calling signup:', registerInfo);
    return this.httpClient.post(environment.apiUrl + '/auth/signup', registerInfo)
      .pipe(
        tap(
          (response: ISignupInfo) => response,
          (error: HttpErrorResponse) => console.log('Signup error:', error)
        )
      );
  }
}
