import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import { CartI } from './Models/product.model';
import { Router, ActivatedRoute } from '@angular/router'; // Import Router and ActivatedRoute
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  template: `
    <app-header [cart]="cart" *ngIf="!isLoginPage"></app-header>
    <router-outlet></router-outlet>
    <app-footer *ngIf="!isLoginPage"></app-footer>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  cart: CartI = {items: []};
  isLoginPage = false; // Add this line

  constructor(
    private cartService: CartService,
    private router: Router,           
    private activatedRoute: ActivatedRoute,
    private metaTagService: Meta
  ) {
    // Check if the current route is the login page
    this.router.events.subscribe(() => {
      this.isLoginPage = (this.router.url === '/login' || this.router.url === '/Register');
    });
    
  }

  ngOnInit(){
    this.metaTagService.addTags([
      { name: 'keywords', content: 'sofani market' },
      { name: 'description', content: 'sofani market' },
      { name: 'robots', content: 'sofani market, sofani market' },
      // Andere meta tags...
    ]);
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
