import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
})
export class SectionHeaderComponent {
  text = input();
  greenText = input();
}
