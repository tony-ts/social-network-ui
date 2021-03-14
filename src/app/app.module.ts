import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDialogModule} from '@angular/material/dialog';

import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {SignupComponent} from './components/signup/signup.component';
import {AppRoutingModule} from './modules/app-routing/app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {AuthAppComponent} from './auth-app.component';
import {MatMenuModule} from '@angular/material/menu';
import {FriendsComponent} from './components/friends/friends.component';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LocalStorageDecorator} from './components/storage/local-storage.decorator';
import {LocalStorageItem} from './components/storage/LocalStorageItem';
import {MatPaginatorModule} from '@angular/material/paginator';
import {UserService} from './services/user.service';
import { FriendsSearchComponent } from './components/friends-search/friends-search.component';
import { FriendsRequestsComponent } from './components/friends-requests/friends-requests.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavigationComponent,
    HomeComponent,
    ProfileComponent,
    SignupComponent,
    AuthAppComponent,
    FriendsComponent,
    FriendsSearchComponent,
    FriendsRequestsComponent
  ],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => LocalStorageDecorator.getItem(LocalStorageItem.ACCESS_TOKEN),
        allowedDomains: [environment.jwtAllowedDomains],
      }
    }),
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSliderModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatToolbarModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatMenuModule,
    AppRoutingModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
