import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../interfaces/Category.inteface';
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  public host = 'http://localhost:8080';

  constructor(private http: HttpClient, private auth: AuthenticationService) { }
  // Query
  public getAdById(id: number) {
    return this.http.get(this.host + '/ads/byid/' + id);
  }
  public getAdByCategoryName(categoryName: string) {
    return this.http.get(this.host + '/ads/maroc/' + categoryName);
  }
  public getAdByCityName(cityName: string) {
    return this.http.get(this.host + '/ads/' + cityName);
  }
  public getAdByCatAndCit(cityName: string, categoryName: string) {
    return this.http.get(this.host + '/ads/' + cityName + '/' + categoryName);
  }

  // Searching
  // http://localhost:8080/ads/search/Rabat/Computers/hp
  // http://localhost:8080/ads/search/?categoryName=Computers&cityName=Rabat&motCle=h
  public getAdByCatAndCitAndMC(categoryName: string, cityName: string, motCle: string) {
    return this.http.get(this.host + '/ads/search/?cityName=' + cityName + '&categoryName=' + categoryName + '&motCle=' + motCle);
  }

  // Cities CRUD
  public getCities() {
    return this.http.get(this.host + '/cities');
  }
  public saveCity(city) {
    const token = this.auth.loadToken();
    return this.http.post(this.host + '/saveCity', city,
      {headers: new HttpHeaders({Authorization: token})} );
  }
  public updateCity(city) {
    const token = this.auth.loadToken();
    return this.http.put(this.host + '/updateCity', city, {headers: new HttpHeaders({Authorization: token})} );
  }
  public deleteCity(id) {
    const token = this.auth.loadToken();
    return this.http.delete(this.host + '/deleteCity/' + id,
      {headers: new HttpHeaders({Authorization: token})});
  }
  // Categories CRUD
  public getCategories(): Observable<any> {
    return this.http.get(this.host + '/categories');
  }
  public saveCategory(category) {
    const token = this.auth.loadToken();
    return this.http.post(this.host + '/saveCategory', category, {headers: new HttpHeaders({Authorization: token})});
  }
  public updateCategory(category) {
    const token = this.auth.loadToken();
    return this.http.put(this.host + '/updateCategory', category, {headers: new HttpHeaders({Authorization: token})});
  }
  public deleteCategory(id) {
    const token = this.auth.loadToken();
    return this.http.delete(this.host + '/deleteCategory/' + id,
      {headers: new HttpHeaders({Authorization: token})});
  }
  // Ads CRUD
  public getAds(page: number, size: number) {
    const token = this.auth.loadToken();
    return this.http.get(this.host + '/adminads?page=' + page + '&size=' + size,
      {headers: new HttpHeaders({Authorization: token})});
  }
  public saveAd(ad) {
    return this.http.post(this.host + '/ads', ad);
  }
  public updateAd(ad) {
    return this.http.put(this.host + '/ads', ad);
  }
  public deleteAd(id) {
    return this.http.delete(this.host + '/ads/' + id);
  }
  // Get Type
  public getTypeOD() {
    return this.http.get(this.host + '/typeod');
  }
  public getTypePP() {
    return this.http.get(this.host + '/typepp');
  }
  // Get Categories Parent
  public getCategoryParents() {
    return this.http.get(this.host + '/categoryParents');
  }
  public getCategoriesByCategoryParent(categoryParentName) {
    return this.http.get(this.host + '/categories/' + categoryParentName);
  }
  public saveCategoryParent(categoryParent) {
    const token = this.auth.loadToken();
    return this.http.post(this.host + '/saveCategoryParent', categoryParent, {headers: new HttpHeaders({Authorization: token})});
  }
  public updateCategoryParent(categoryParent) {
    const token = this.auth.loadToken();
    return this.http.put(this.host + '/updateCategoryParent', categoryParent, {headers: new HttpHeaders({Authorization: token})});
  }
  public deleteCategoryParent(id) {
    const token = this.auth.loadToken();
    return this.http.delete(this.host + '/deleteCategoryParent/' + id, {headers: new HttpHeaders({Authorization: token})});
  }
  // ===== Ads By Category Parent =====
  public getAdsByCategoryParent(categoryParentName: string) {
    return this.http.get(this.host + '/ads/maroc/cp/' + categoryParentName);
  }
  // ===== Ads By Category Parent And City Name =====
  public getAdsByCategoryParentAndCity(categoryParentName: string, cityName) {
    return this.http.get(this.host + '/ads/cp/' + cityName + '/' + categoryParentName);
  }

  public getAdsByUsername(username: string) {
    return this.http.get(this.host + '/ads?username=' + username);
  }
}
