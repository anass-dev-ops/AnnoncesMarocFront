import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AdsService} from "../../services/ads.service";

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent implements OnInit {

  id; ad;

  constructor(private activatedRoute: ActivatedRoute, private adsService: AdsService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.onGetAdById(this.id);
  }
  public onGetAdById(id) {
    this.adsService.getAdById(id).subscribe(data => {
      this.ad = data;
    }, error => {
      console.log(error);
    });
  }
}
