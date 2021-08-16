import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {User} from "./models/User";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-crud';
  currentUser!: User;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
