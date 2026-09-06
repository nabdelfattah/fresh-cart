import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionHeaderComponent } from '@shared/ui/section-header/section-header.component';
import { CategoryCardComponent } from '../../../categories/category-card/category-card.component';
import { Category } from '@core/models/category.interface';
import { CategoriesService } from '@core/services/categories.service';

@Component({
  imports: [SectionHeaderComponent, CategoryCardComponent],
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
})
export class CategoryHomeComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);

  categories = signal<Category[]>([]);

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => this.categories.set(res),
      error: (err) => {},
    });
  }
}
