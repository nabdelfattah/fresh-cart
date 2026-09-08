import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { RouterLink } from '@angular/router';
import { TrimTitlePipe } from '@shared/pipes/trim-title-pipe';
import { CartService } from '@core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  imports: [CurrencyPipe, RouterLink, TrimTitlePipe],
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  data = input<Product>();

  addToCart(id: string) {
    if (localStorage.getItem('freshToken')) {
      this.cartService.addProductToCart(id).subscribe({
        next: (res) => {
          console.log(res);
          this.toastrService.success(res.message, 'FreshCart', {
            progressBar: true,
            closeButton: true,
          });
          this.cartService.cartCount.set(res.numOfCartItems);
        },
      });
    } else {
      this.toastrService.warning('Login First', 'FreshCart', {
        progressBar: true,
        closeButton: true,
      });
    }
  }
}
