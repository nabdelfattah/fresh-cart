import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Service()
export class CartService {
  private readonly httpClient = inject(HttpClient);

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(environment.baseUrl2 + '/cart', {
      productId: id,
    });
  }

  getCartProducts(): Observable<any> {
    return this.httpClient.get(environment.baseUrl2 + '/cart');
  }

  removeItem(id: string): Observable<any> {
    return this.httpClient.delete(environment.baseUrl2 + '/cart/' + id);
  }
  updateItemCount(id: string, count: number): Observable<any> {
    return this.httpClient.put(environment.baseUrl2 + '/cart/' + id, {
      count,
    });
  }

  clearCart(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl2 + '/cart');
  }
}
