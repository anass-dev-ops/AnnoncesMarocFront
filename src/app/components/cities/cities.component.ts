import { Component, OnInit } from '@angular/core';
import {AdsService} from "../../services/ads.service";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {

  cities; mode = false; city; saveUpdate = true;

  constructor(private adsService: AdsService) { }

  ngOnInit(): void {
    this.onGetCities();
  }
  public onGetCities() {
    this.adsService.getCities().subscribe(data => {
      this.cities = data;
    }, error => {
      console.log(error);
    });
  }
  public onSaveCity(dataForm) {
    // console.log(dataForm.value);
    this.adsService.saveCity(dataForm.value).subscribe(data => {
      console.log(data);
      this.onGetCities();
      this.mode = !this.mode;
    }, error => {
      console.log(error);
    });
  }
  public onUpdateCity(dataForm) {
    this.adsService.updateCity(dataForm.value).subscribe(data => {
      console.log(data);
      this.onGetCities();
      this.mode = !this.mode;
    }, error => {
      console.log(error);
    });
  }
  public onDeleteCity(id) {
    if (confirm('Are you sur ?')) {
      this.adsService.deleteCity(id).subscribe(data => {
        console.log(data);
        this.onGetCities();
      }, error => {
        console.log(error);
      });
    }
  }

}
