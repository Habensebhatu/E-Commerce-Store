import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/Models/cart.models';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  categories = ['Food', 'Kleding', 'Cosmetica']
  searchValue: string | undefined;
  noProductsFound: boolean = false;
  @Input()
  get cart(): Cart {
    return this._cart;
  }
  ngOnInit(): void {
  
  }
  search(){
    
    // let searchResults = this.performSearch(this.searchValue)
    // if (searchResults.length === 0) {
    //   this.noProductsFound = true;
    // } else {
    //   this.noProductsFound = false;
    // }
    this.noProductsFound = true;
  }

  onCategorySelect(category: string): void {
    console.log('You selected: ', category);
    // Do something with category
  }
  
  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }
  constructor(private cartService: CartService) {}

  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
