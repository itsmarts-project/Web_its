import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router){}

  logOut(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu(){
    this.router.navigate(['/menu-admin']);
  }
}
