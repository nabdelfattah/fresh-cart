import { isPlatformBrowser } from '@angular/common';
import { FlowbiteService } from './../../core/services/flowbite.service';
import { Component, computed, inject, PLATFORM_ID, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/auth/services/auth.service';
import { initFlowbite } from 'flowbite';

@Component({
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly flowbiteService = inject(FlowbiteService);
  private readonly authService = inject(AuthService);
  private readonly platformId = inject(PLATFORM_ID);

  // logged = this.authService.isLogged.asReadonly;
  logged = computed(() => this.authService.isLogged());

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('freshToken')) {
        this.authService.isLogged.set(true);
      }
    }
    this.flowbiteService.loadFlowbite(() => {
      initFlowbite();
    });
  }

  signOut() {
    this.authService.logout();
  }
}
