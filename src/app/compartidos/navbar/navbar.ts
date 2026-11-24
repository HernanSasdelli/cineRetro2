import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth } from '../auth';
import { SoloAdmin } from '../../directivas/solo-admin';

@Component({
  imports: [RouterLink, RouterLinkActive, SoloAdmin],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  auth = inject(Auth);
  private router = inject(Router);

  async salir() {
    await this.auth.logout();
    this.router.navigate(['/cartelera']);
  }
}