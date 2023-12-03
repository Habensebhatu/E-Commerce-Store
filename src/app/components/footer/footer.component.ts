import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: 'footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  log = 'footer-logo.png';

  constructor(private router: Router) {}

  onFooterLinkClick(fragment: string): void {
    this.router.navigate(['/home'], { fragment: fragment }).then(() => {
      const element = document.querySelector("#" + fragment);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo(0, 0);
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/Register']);
  }
  
}
