import { Component, OnInit } from '@angular/core';
import {AdsService} from '../../services/ads.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {

  ads; ad; mode = false; saveUpdate = true;
  cities; categories; typeod; typepp; page = 0; size = 5; totalPages;
  numPages: Array<number> = []; currentPage = 0;
  file;
  constructor(private adsService: AdsService, private route: Router) { }

  ngOnInit(): void {
    this.onGetAds(this.page, this.size);
    this.onGetCities();
    this.onGetCategories();
    this.onGetTypeOD();
    this.onGetTypePP();
  }

  public onGetAds(page: number, size: number) {
    this.adsService.getAds(page, size).subscribe(data => {
      this.ads = data;
      this.totalPages = this.ads.totalPages;
      this.numPages = new Array(this.totalPages);
      // console.log(this.numPages);
    }, error => {
      console.log(error);
    });
  }
  public onSaveAd(ad) {
    // console.log(ad);
    const formData = new FormData();
    formData.append('files', this.file);
    formData.append('ad', JSON.stringify(ad));
    this.adsService.saveAd(formData).subscribe(data => {
      // console.log(data);
      this.onGetAds(this.page, this.size);
      this.mode = !this.mode;
    }, error => {
      console.log(error);
    });
  }
  public onUpdateAd(ad) {
    this.adsService.updateAd(ad).subscribe(data => {
      this.onGetAds(this.page, this.size);
      this.mode = !this.mode;
    }, error => {
      console.log(ad);
    });
  }
  public onDeleteAd(id) {
    if (confirm('Are you sur ??')) {
      return this.adsService.deleteAd(id).subscribe(data => {
        this.onGetAds(this.currentPage, this.size);
      }, error => {
        console.log(error);
      });
    }
  }
  public onGetCities() {
    this.adsService.getCities().subscribe(data => {
      this.cities = data;
    }, error => {
      console.log(error);
    });
  }
  public onGetCategories() {
    this.adsService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    });
  }
  public onGetTypeOD() {
    this.adsService.getTypeOD().subscribe(data => {
      this.typeod = data;
    }, error => { console.log(error); });
  }
  public onGetTypePP() {
    this.adsService.getTypePP().subscribe(data => {
      this.typepp = data;
    }, error => { console.log(error); });
  }
  goAdDetail(id) {
    this.route.navigateByUrl('/ads/' + id);
  }
  onSelectFile(event) {
    this.file = event.target.files[0];
  }
  // =============Activer Ad===========
  onActiveAd(ad) {
    if (confirm('Are You sur to Change State this Ad ?')) {
      ad.state = !ad.state;
      this.adsService.updateAd(ad).subscribe(data => {
        this.onGetAds(this.currentPage, this.size);
        // this.mode = !this.mode;
      }, error => {
        console.log(ad);
      });
    }
  }
}
