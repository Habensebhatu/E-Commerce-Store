import { Component, OnInit } from '@angular/core';
import { CartService } from './service/cart.service';
import {  CartI } from './Models/product.model';

@Component({
  selector: 'app-root',
  template: `
    <app-header [cart]="cart"></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent implements OnInit{
  cart : CartI = {items: []};
  
  constructor(private cartService: CartService){}
  ngOnInit(){
   this.cartService.cart.subscribe((_cart)=>{
    this.cart = _cart
   })
  }
}
