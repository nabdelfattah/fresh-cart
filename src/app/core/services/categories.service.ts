import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { map, Observable } from 'rxjs';
import { Category } from '@core/models/category.interface';

interface CategoriesRes {
  data: Category[];
  metadata: Object;
  results: number;
}

interface CategoryRes {
  data: Category;
}

@Service()
export class CategoriesService {
  private readonly httpClient = inject(HttpClient);

  getAllCategories(): Observable<Category[]> {
    return this.httpClient
      .get<CategoriesRes>(environment.baseUrl + '/categories')
      .pipe(map((res) => res.data));
  }

  getCategoryDetails(id: string): Observable<Category> {
    return this.httpClient
      .get<CategoryRes>(environment.baseUrl + `/categories/${id}`)
      .pipe(map((res) => res.data));
  }
}
