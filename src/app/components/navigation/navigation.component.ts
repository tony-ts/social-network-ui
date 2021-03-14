import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageDecorator} from '../storage/local-storage.decorator';
import {LocalStorageItem} from '../storage/LocalStorageItem';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router) {
  }

  ngOnInit(): void {
  }

  logout(): Promise<boolean> {
    LocalStorageDecorator.removeItem(LocalStorageItem.ACCESS_TOKEN);
    return this.router.navigateByUrl('login');
  }
}
