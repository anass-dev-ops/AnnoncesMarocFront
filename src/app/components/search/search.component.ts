import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {AdsService} from '../../services/ads.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  categories;
  cities;
  // @Output() searchEvent = new EventEmitter(); status = true;
  constructor(private route: Router, private adsService: AdsService) { }

  ngOnInit(): void {
    this.onGetCategories();
    this.onGetCities();
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
  public onSearch(formData: NgForm) {
    // this.searchEvent.emit(this.status);
    const urlInfo = formData.value;
    if (urlInfo.motCle === null) { urlInfo.motCle = ''; }
    this.route.navigateByUrl('/ads/search/' + urlInfo.cityName + '/' + urlInfo.categoryName + '/' + urlInfo.motCle);
  }
}
