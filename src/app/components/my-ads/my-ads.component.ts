import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {AdsService} from "../../services/ads.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css']
})
export class MyAdsComponent implements OnInit {

  myAds; username: string; showForm: boolean;

  constructor(private auth: AuthenticationService,
              private adsService: AdsService,
              private route: Router) { }

  ngOnInit(): void {
    this.onGetAdsByUsername();
  }

  onGetAdsByUsername() {
    this.username = this.auth.getUsername();
    this.adsService.getAdsByUsername(this.username).subscribe(data => {
      this.myAds = data; console.log(data);
    }, error => { console.log(error); });
  }

  onAdDelete(id) {
    if (confirm('Are you sur ?')) {
      this.adsService.deleteAd(id).subscribe(data => {
        this.onGetAdsByUsername(); // console.log(data);
      }, error => { console.log(error); });
    }
  }

  goAdDetail(id) {
    this.route.navigateByUrl('/ads/' + id);
  }

  actionA(event) {
    this.showForm = event;
    this.onGetAdsByUsername();
  }

}
