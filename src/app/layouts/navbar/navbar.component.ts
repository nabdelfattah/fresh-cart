import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly flowbiteService = inject(FlowbiteService);

  ngOnInit(): void {
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }
}
