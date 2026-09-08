import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { initFlowbite } from 'flowbite';
import { CartService } from '@core/services/cart.service';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly cartService = inject(CartService);

  // logged = this.authService.isLogged.asReadonly;
  logged = computed(() => this.authService.isLogged());
  cartCount = computed(() => this.cartService.cartCount());

  ngOnInit(): void {
    // if user logged in, update navbar
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
        // get cart items from the server
        this.getCartProducts();
      }
      // get cart items from local storage
    }
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }

  getCartProducts() {
    this.cartService.getCartProducts().subscribe({
      next: (res) => {
        this.cartService.cartCount.set(res.numOfCartItems);
      },
      error: () => {},
    });
  }

  signOut() {
    this.authService.logout();
  }
}
