import { Component, OnInit } from '@angular/core';
import {AdsService} from "../../services/ads.service";
import {Category} from "../../interfaces/Category.inteface";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // categories: Array<Category>;
  categoryParents;
  categories;
  cities;

  constructor(private adsService: AdsService, private route: Router) { }

  ngOnInit(): void {
    this.onGetCategoryParents();
    this.onGetCategories();
    this.onGetCities();
  }
  public onGetCategoryParents() {
    this.adsService.getCategoryParents().subscribe(data => {
      this.categoryParents = data; // console.log(data);
    }, error => {
      console.log(error);
    });
  }
  public onGetCategories() {
    this.adsService.getCategories().subscribe(data => {
      this.categories = data; // console.log(data);
    }, error => {
      console.log(error);
    });
  }
  public onGetCities() {
    this.adsService.getCities().subscribe(data => {
      this.cities = data;
    }, error => {
      console.log(error);
    });
  }


  goAdList(type, name) {
    this.route.navigateByUrl('/ads/' + type + '/' + name);
  }
}
