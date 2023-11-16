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

  navigateToRegister(): void {
    this.router.navigate(['/Register']);
  }
}
