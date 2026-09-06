import { Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { SectionHeaderComponent } from '@shared/ui/section-header/section-header.component';
import { ProductCardComponent } from '../../../products/product-card/product-card.component';
import { ProductsService } from '@core/services/products.service';

@Component({
  imports: [SectionHeaderComponent, ProductCardComponent],
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
})
export class ProductHomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  products = signal<Product[]>([]);

  ngOnInit() {
    this.getFeaturedProducts();
  }

  getFeaturedProducts() {
    this.productsService.getFeaturedProducts().subscribe({
      next: (res) => {
        this.products.set(res);
      },
      error: (err) => {},
    });
  }
}
