import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Category } from '@core/models/category.interface';
import { CategoriesService } from '@core/services/categories.service';

@Component({
  imports: [],
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
})
export class CategoryDetailsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  id = input('');
  data = signal<Category>({} as Category);

  ngOnInit() {
    this.getCategoryData();
  }

  getCategoryData() {
    this.categoriesService.getCategoryDetails(this.id()).subscribe({
      next: (res) => {
        this.data.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
