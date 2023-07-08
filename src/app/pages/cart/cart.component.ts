import { Component } from '@angular/core';
import { CartItem } from 'src/app/Models/cart.models';
import { Cart } from 'src/app/Models/cart.models';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html' 
 
})
export class CartComponent {
  cart: Cart = {items:[
  ]
  }
  
  dataSource : Array<CartItem> = [];
  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];

  constructor(private cartService: CartService){}
ngOnInit(){
  this.cartService.cart.subscribe((_cart: Cart)=>{
    this.cart = _cart;
    this.dataSource = this.cart.items;
    console.log("data333", this.dataSource)
  })
 
}

getTotal(items: CartItem[]): number {
  return this.cartService.getTotal(items);
  
}

onAddQuantity(item: CartItem): void {
  this.cartService.addToCart(item);
}

onRemoveQuantity(item: CartItem): void {
  this.cartService.removeQuantity(item);
}


onClearCart(): void {
  this.cartService.clearCart();
}

onRemoveFromCart(item: CartItem): void {
  this.cartService.removeFromCart(item);
}

}
