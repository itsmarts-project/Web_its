import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  nombre: string;
  rol: string;
  private subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getUserInfo();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getUserInfo() {
    this.subscription = this.authService.getUserInfo().subscribe(userInfo => {
      if (userInfo) {
        this.rol = userInfo.rol;
        this.nombre = `${userInfo.nombre} ${userInfo.primerApellido}`;
      }
    });
  }

  logOut() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.router.navigate(['/menu-admin']);
  }
}