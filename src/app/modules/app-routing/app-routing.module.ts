import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from '../../components/home/home.component';
import {ProfileComponent} from '../../components/profile/profile.component';
import {LoginComponent} from '../../components/login/login.component';
import {SignupComponent} from '../../components/signup/signup.component';
import {AuthAppComponent} from '../../auth-app.component';
import {AppComponent} from '../../app.component';
import {FriendsComponent} from '../../components/friends/friends.component';
import {AuthGuard} from '../../guards/auth.guard';
import {FriendsSearchComponent} from '../../components/friends-search/friends-search.component';
import {FriendsRequestsComponent} from '../../components/friends-requests/friends-requests.component';


const routes: Routes = [
  {
    path: '',
    component: AuthAppComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      {
        path: 'home', component: HomeComponent
      },
      {
        path: 'user/:id', component: ProfileComponent
      },
      {
        path: 'friends', component: FriendsComponent
      },
      {
        path: 'friends/search', component: FriendsSearchComponent
      },
      {
        path: 'friends/requests', component: FriendsRequestsComponent
      }
    ]
  },
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: 'signup', component: SignupComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
