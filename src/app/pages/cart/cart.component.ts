import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
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

  constructor(private cartService: CartService, private http: HttpClient){}
ngOnInit(){
  this.cartService.cart.subscribe((_cart: Cart)=>{
    this.cart = _cart;
    this.dataSource = this.cart.items;
    console.log("data333", this.dataSource)
    console.log("items", this.cart.items)
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
onCheckout(): void {
  this.http
    .post('http://localhost:4242/checkout', {
      items: this.cart.items,
    
    })
    .subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51NTNZBD7MblCQnUpYTVDGZm17TPDhkiEi1IlYWD7sTFcmSalAEKYRj3R1YKAudhsPHDlV998DMuqvTVmOPBpDckM00rBnZ0I4U');
      stripe?.redirectToCheckout({
        sessionId: res.id,
      });
    });
   
}

}
