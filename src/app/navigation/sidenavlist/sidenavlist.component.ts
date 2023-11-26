import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenavlist',
  templateUrl: './sidenavlist.component.html',
  styleUrls: ['./sidenavlist.component.scss']
})
export class SidenavlistComponent implements OnInit{
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onCloseSidenav() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onCloseSidenav();
    this.authService.logout();
  }

  ngOnDestroy() {
    if(this.authSubscription){
      this.authSubscription.unsubscribe()
    }
  }

}
 