import { Component } from '@angular/core';
import { from, fromEvent, map, Observable, of, scan } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-brands',
  templateUrl: './brands.component.html',
})
export class BrandsComponent {
  ovservable = of([1, 2, 3, 4, 5]);

  ngOnInit() {
    this.ovservable.subscribe({
      next: (res) => {},
      error: (err) => {},
      complete: () => {},
    });
  }
}
