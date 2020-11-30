import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthenticationService, private route: Router) { }

  ngOnInit(): void {
    // console.log(this.isAuthenticated());
    // console.log(this.isAdmin());
  }

  logout() {
    this.auth.deleteToken();
    this.route.navigateByUrl('/login');
  }
  isAuthenticated() {
    return this.auth.isAuthenticated();
  }
  isAdmin() {
    return this.auth.isAdmin();
  }

  deposerAd() {
    if (this.isAuthenticated()) {
      this.route.navigateByUrl('/my-ads');
    } else {
      this.route.navigateByUrl('/login');
    }
  }

}
