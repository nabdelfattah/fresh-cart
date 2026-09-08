import { Component, inject, signal } from '@angular/core';
import { CartService } from '@core/services/cart.service';
import { CartProductCardComponent } from './components/cart-product-card/cart-product-card.component';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartDetails } from './cart-details.interface';

@Component({
  imports: [CartProductCardComponent, RouterLink],
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);

  cartDetails = signal<CartDetails>({
    status: '',
    message: '',
    numOfCartItems: 0,
    cartId: '',
    data: {
      products: [],
      __v: 0,
      totalCartPrice: 0,
    },
  });

  ngOnInit() {
    this.getCartProducts();
    this.cartService.cartCount.set(this.cartDetails().numOfCartItems);
  }

  getCartProducts() {
    this.cartService.getCartProducts().subscribe({
      next: (res) => {
        this.cartDetails.set(res);
        this.cartService.cartCount.set(this.cartDetails().numOfCartItems);
        console.log(this.cartDetails());
      },
      error: () => {},
    });
  }

  removeItem(id: string) {
    this.cartService.removeItem(id).subscribe({
      next: (res) => {
        this.cartDetails.set(res);
        this.cartService.cartCount.set(this.cartDetails().numOfCartItems);
      },
    });
  }

  clearCart() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'FreshCart', {
          progressBar: true,
          closeButton: true,
        });
        this.cartDetails.set(res);
        this.cartService.cartCount.set(this.cartDetails().numOfCartItems);
      },
    });
  }
}
