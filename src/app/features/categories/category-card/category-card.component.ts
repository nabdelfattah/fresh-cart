import { Component, input } from '@angular/core';
import { Category } from '@core/models/category.interface';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
  data = input<Category>({} as Category);
}
