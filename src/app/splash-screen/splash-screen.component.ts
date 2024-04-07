import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {
  constructor(private router: Router){ }

  ngOnInit():void{
    setTimeout(()=>{
      const splashContainer = document.querySelector('.splash-container');
      splashContainer?.classList.add('fade-out');
      
      setTimeout(()=>{
        this.router.navigate(['/login']);
      }, 1000);
    }, 1000);
  }
}
