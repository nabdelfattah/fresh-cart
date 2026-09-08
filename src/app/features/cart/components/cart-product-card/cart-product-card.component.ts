import { CurrencyPipe } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { TrimTitlePipe } from '@shared/pipes/trim-title-pipe';
import { TruncateIdPipe } from '@shared/pipes/truncate-id-pipe';
import { CartDetails, CartProduct } from '../../cart-details.interface';
import { CartService } from '@core/services/cart.service';
import { Product } from '@core/models/product.interface';

@Component({
  imports: [TrimTitlePipe, CurrencyPipe, TruncateIdPipe],
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
})
export class CartProductCardComponent {
  private readonly cartService = inject(CartService);

  data = input({} as CartProduct);
  response = output<CartDetails>();

  removeItem(id: string) {
    this.cartService.removeItem(id).subscribe({
      next: (res) => {
        this.response.emit(res);
      },
    });
  }

  reduceCount(product: Product, count: number) {
    if (count > 1) {
      this.updateCount(product.id, count - 1);
    }
  }

  increaseCount(product: Product, count: number) {
    if (product.quantity > count) {
      this.updateCount(product.id, count + 1);
    }
  }

  updateCount(id: string, count: number) {
    this.cartService.updateItemCount(id, count).subscribe({
      next: (res) => {
        this.response.emit(res);
      },
    });
  }
}
