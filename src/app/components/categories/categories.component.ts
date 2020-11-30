import { Component, OnInit } from '@angular/core';
import {AdsService} from '../../services/ads.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories; mode = false; category; saveUpdate = true;
  categoryParents; currentCategoryParent; modeP = false; categoryParent; saveUpdateP = true;
  file;
  error = false; errorMassage: string;
  constructor(private adsService: AdsService) { }

  ngOnInit(): void {
    this.onGetCategories();
    this.onGetCategoryParents();
  }
  // ==== Category =====
  public onGetCategories() {
    this.adsService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    });
  }
  public onSaveCategory(category) {
    this.adsService.saveCategory(category).subscribe(data => {
      // console.log(data);
      this.mode = !this.mode;
      this.onGetCategoriesByCategoryParent(this.currentCategoryParent.name);
    }, error => {
      this.error = true;
      console.log(error);
    });
  }
  public onUpdateCatgory(category) {
    this.adsService.updateCategory(category).subscribe(data => {
      // console.log(data);
      this.mode = !this.mode;
      this.onGetCategories();
    }, error => {
      console.log(error);
      this.error = true;
    });
  }
  public onDeleteCategory(id) {
    if (confirm('Are you Sur ?')) {
      this.adsService.deleteCategory(id).subscribe(data => {
        console.log(data);
        this.onGetCategories();
      }, error => {
        console.log(error);
        this.error = true;
      });
    }
  }
  // ===== Parent ====
  public onGetCategoryParents() {
    this.adsService.getCategoryParents().subscribe(data => {
      this.categoryParents = data;
    }, error => { console.log(error); });
  }
  public onGetCategoriesByCategoryParent(categoryParentName) {
    this.adsService.getCategoriesByCategoryParent(categoryParentName).subscribe(data => {
      this.categories = data;
      }, error => { console.log(error); });
  }
  public onSaveCategoryParent(categoryParent) {
    const formData = new FormData();
    formData.append('categoryParent', JSON.stringify(categoryParent));
    formData.append('file', this.file);
    this.adsService.saveCategoryParent(formData).subscribe(data => {
      this.modeP = !this.modeP;
      this.onGetCategoryParents();
      this.file = {};
    }, error => {
      this.error = true;
      this.errorMassage = error.error.message;
      console.log(error);
    });
  }
  public onUpdateCategoryParent(categoryParent) {
    // categoryParent.image = this.categoryParent;
    console.log(categoryParent);
    this.adsService.updateCategoryParent(categoryParent).subscribe(data => {
      // console.log(data);
      this.modeP = !this.modeP;
      this.onGetCategoryParents();
    }, error => {
      this.error = true;
      console.log(error);
    });
  }
  public onDeleteCategoryParent(id) {
    if (confirm('Are you Sur ?')) {
      this.adsService.deleteCategoryParent(id).subscribe(data => {
        console.log(data);
        this.onGetCategoryParents();
      }, error => {
        this.error = true;
        console.log(error);
      });
    }
  }

  onSelectFile(event) {
    this.file = event.target.files[0];
    // console.log(file);
  }
}
