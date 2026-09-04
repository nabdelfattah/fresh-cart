import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Product } from '@core/models/product.interface';
import { RouterLink } from '@angular/router';
import { TrimTitlePipe } from '@shared/pipes/trim-title-pipe';

@Component({
  imports: [CurrencyPipe, RouterLink, TrimTitlePipe],
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  data = input<Product>();
}
