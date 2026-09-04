import { Component } from '@angular/core';
import { SliderComponent } from './components/slider/slider.component';
import { CategoryHomeComponent } from './components/category-home/category-home.component';
import { ProductHomeComponent } from './components/product-home/product-home.component';

@Component({
  imports: [SliderComponent, CategoryHomeComponent, ProductHomeComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {}
