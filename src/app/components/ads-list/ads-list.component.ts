import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdsService} from '../../services/ads.service';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: ['./ads-list.component.css']
})
export class AdsListComponent implements OnInit, OnChanges {

  type: string; param: string; category: string; mot: string;
  ads: any = [];
  categories; categoryParents; currentCategory; currentCategoryParent;

  constructor(private route: Router,
              private adsService: AdsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getParametersFromUrl();
    this.searching();
  }

  getParametersFromUrl() {
    this.type = this.activatedRoute.snapshot.params.type;
    this.param = this.activatedRoute.snapshot.params.param; // cat = categoryParent Or CityName
    this.category = this.activatedRoute.snapshot.params.category;
    this.mot = this.activatedRoute.snapshot.params.mot;
  }
  searching() {
    if (this.type === 'cat') {
      this.onGetCategoriesByCategoryParent(this.param);
      this.onGetAdsByCategoryParent(this.param);
    } else if (this.type === 'cit') {
      this.onGetCategoryParents();
      this.onGetAdByCit(this.param);
    } else if (this.type === 'search') {
      this.onGetAdByCatAndCitAndMC(this.category, this.param, this.mot);
    }
  }
  public onGetAdsByCategoryParent(categoryParentName: string) {
    this.adsService.getAdsByCategoryParent(categoryParentName).subscribe(data => {
      this.ads = data; console.log('onGetCategoryParents: ', this.ads.length);
    }, error => {
      console.log(error);
    });
  }
  public onGetAdByCit(cityName: string) {
    this.adsService.getAdByCityName(cityName).subscribe(data => {
      this.ads = data; console.log('onGetAdByCit:  ', data);
    }, error => {
      console.log(error);
    });
  }
  public onGetAdByCatAndCitAndMC(categoryName: string, cityName: string, motCle: string) {
    this.adsService.getAdByCatAndCitAndMC(categoryName, cityName, motCle).subscribe(data => {
      this.ads = data; console.log('onGetAdByCatAndCitAndMC: ', data);
    }, error => {
      console.log(error);
    });
  }

  goAdDetail(id) {
    this.route.navigateByUrl('/ads/' + id);
  }

  // Get Categories By Category Parent
  public onGetCategoriesByCategoryParent(categoryParentName: string) {
    this.adsService.getCategoriesByCategoryParent(categoryParentName).subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    });
  }
  // Get CategoryParents
  public onGetCategoryParents() {
    this.adsService.getCategoryParents().subscribe(data => {
      this.categoryParents = data; console.log('onGetCategoryParents : ', data);
    }, error => { console.log(error); });
  }
  // Get Ads By Category
  public onGetAdByCategoryName(categoryName: string) {
    this.adsService.getAdByCategoryName(categoryName).subscribe(data => {
      this.ads = data; console.log('onGetAdByCategoryName : ', data);
    }, error => { console.log(error); });
  }
  // Get Ads By Category Parent And City Name
  public onGetAdByCategoryParentAndCity(categoryName: string, cityName: string) {
    this.adsService.getAdsByCategoryParentAndCity(categoryName, cityName).subscribe(data => {
      this.ads = data;
    }, error => { console.log(error); });
  }

  onSearchEvent(event) {
    console.log('Event ==== : ', event);
    this.getParametersFromUrl();
    this.searching();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.getParametersFromUrl();
    this.searching();
  }

}
