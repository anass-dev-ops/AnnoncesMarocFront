import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdsService} from '../../services/ads.service';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-ad',
  templateUrl: './add-ad.component.html',
  styleUrls: ['./add-ad.component.css']
})
export class AddAdComponent implements OnInit {

  ad: FormGroup; username: string; user;
  cities; categories; typeOD; typePP;
  file;
  @Output()
  showMe = new EventEmitter();
/*  {
  "id": 1,
  "title": "HP Compaq Pro SFF",
  "description": "HP Compaq Pro SFF Description D'aunnonce",
  "price": 9000,
  "image": "HP_Compaq_Pro_SFF",
  "category": {
    "id": 1,
    "name": "Computers",
    "categoryParent": {
      "id": 1,
      "name": "Informatique et Multimedia",
      "image": "Informatique_et_Multimedia.png"
    }
  },
  "city": {
    "id": 2,
    "name": "Rabat"
  },
  "typeOD": {
    "id": 1,
    "typeName": "OFFRE"
  },
  "typePP": {
    "id": 1,
    "typeName": "PARTICULIER"
  },
  "state": true,
  "appUser": {
    "username": "ali",
    "roles": [
      {
        "roleName": "USER"
      }
    ]
  },
  "creationDate": "2020-06-12T13:18:47.000+00:00"
}*/

  constructor(private formBuilder: FormBuilder,
              private adsService: AdsService,
              private auth: AuthenticationService,
              private route: Router) { }

  ngOnInit(): void {
    this.username = this.auth.getUsername();
    this.onGetUserByUsername();
    this.onGetCities();
    this.onGetCategories();
    this.onGetTypeOD();
    this.onGetTypePP();
    this.ad = this.formBuilder.group({
      appUser: {username: this.username},
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      city: [{}, Validators.required],
      category: [{}, Validators.required],
      typeOD: [{}, Validators.required],
      typePP: [{}, Validators.required]
    });
  }
  onSaveAd() {
    // console.log(this.ad.value);
    const formData = new FormData();
    formData.append('ad', JSON.stringify(this.ad.value));
    formData.append('files', this.file)
    this.adsService.saveAd(formData).subscribe(data => {
      console.log(data);
      this.showMe.emit(false);
    }, error => { console.log(error); });
  }
  onGetUserByUsername() {
    this.auth.getUserByUserName(this.username).subscribe(data => {
      this.user = data; // console.log(data);
    }, error => { console.log(error); });
  }
  onAnnuler() {
    this.showMe.emit(false);
  }
  onGetCities() {
    this.adsService.getCities().subscribe(data => {
      this.cities = data;  // console.log(data);
    }, error => { console.log(error); });
  }
  onGetCategories() {
    this.adsService.getCategories().subscribe(data => {
      this.categories = data;  // console.log(data);
    }, error => { console.log(error); });
  }
  onGetTypeOD() {
    this.adsService.getTypeOD().subscribe(data => {
      this.typeOD = data;  // console.log(data);
    }, error => { console.log(error); });
  }
  onGetTypePP() {
    this.adsService.getTypePP().subscribe(data => {
      this.typePP = data;  // console.log(data);
    }, error => { console.log(error); });
  }
  onSelected(event) {
    this.file = event.target.files[0];
  }
}
