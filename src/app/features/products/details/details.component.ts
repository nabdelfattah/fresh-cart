import { ProductsService } from '@core/services/products.service';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-details',
  templateUrl: './details.component.html',
})
export class DetailsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  id = input('');
  data = signal<Product>({} as Product); // casting

  ngOnInit() {
    this.getProductDetails();
  }

  getProductDetails() {
    this.productsService.getProductDetails(this.id()).subscribe({
      next: (res) => {
        this.data.set(res);
      },
      error: () => {},
    });
  }
}
