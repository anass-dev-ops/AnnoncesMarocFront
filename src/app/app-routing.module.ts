import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AdsListComponent} from './components/ads-list/ads-list.component';
import {AdDetailsComponent} from './components/ad-details/ad-details.component';
import {CitiesComponent} from './components/cities/cities.component';
import {CategoriesComponent} from './components/categories/categories.component';
import {AdsComponent} from './components/ads/ads.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {MyAdsComponent} from "./components/my-ads/my-ads.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'ads/:type/:param', component: AdsListComponent},
  {path: 'ads/:type/:param/:category/:mot', component: AdsListComponent},
  {path: 'ads/:id', component: AdDetailsComponent},
  {path: 'cities', component: CitiesComponent},
  {path: 'categories', component: CategoriesComponent},
  {path: 'ads', component: AdsComponent},
  {path: 'my-ads', component: MyAdsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
