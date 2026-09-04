import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface ProductsRes {
  data: Product[];
  metadata: Object;
  results: number;
}
interface ProductRes {
  data: Product;
}

@Service()
export class ProductsService {
  private readonly httpClient = inject(HttpClient);

  getAllProducts(): Observable<Product[]> {
    return this.httpClient
      .get<ProductsRes>(environment.baseUrl + `/products`)
      .pipe(map((res) => res.data));
  }
  getFeaturedProducts(): Observable<Product[]> {
    return this.httpClient
      .get<ProductsRes>(environment.baseUrl + `/products?limit=10&sort=sold`)
      .pipe(map((res) => res.data));
  }
  getProductDetails(id: string): Observable<Product> {
    return this.httpClient
      .get<ProductRes>(environment.baseUrl + `/products/${id}`)
      .pipe(map((res) => res.data));
  }
}
