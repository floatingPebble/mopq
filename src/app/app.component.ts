import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from './shared/data.service';
import { User } from './shared/user.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  user: User;
  userSub: Subscription;

  constructor(private dataService: DataService, private router: Router) {
    this.user = new User();
  }

  ngOnInit() {
    this.user = this.dataService.activeUser;
    this.userSub = this.dataService.userLoaded.subscribe(user => this.user = user);
  }

  onLogout() {
    this.user = new User();
    this.dataService.activeUser = new User();
    localStorage.removeItem("user");
    this.router.navigate(['']);

  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
