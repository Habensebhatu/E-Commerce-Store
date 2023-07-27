import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CartItem } from 'src/app/Models/cart.models';
import { Cart } from 'src/app/Models/cart.models';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html' 
 
})
export class CartComponent {
  phoneNumber = '061790373929';
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

  constructor(private cartService: CartService, private http: HttpClient, private storeService: StoreService){}
ngOnInit(){
  this.cartService.cart.subscribe((_cart: Cart)=>{
    this.cart = _cart;
    this.dataSource = this.cart.items;
    console.log("cardrd",this.cart.items)
  })
  
}

getTotal(items: CartItem[]): number {
  return this.cartService.getTotal(items);
  
}

getProducts(){
  this.storeService.setAllProducts(true);
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
    .post('https://localhost:7087/api/Stripe/checkout', {
      items: this.cart.items,
    
    })
    .subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51NTNZBD7MblCQnUpYTVDGZm17TPDhkiEi1IlYWD7sTFcmSalAEKYRj3R1YKAudhsPHDlV998DMuqvTVmOPBpDckM00rBnZ0I4U');
      stripe?.redirectToCheckout({
        sessionId: res.id,
      });
    });
   
}

// onCheckout(): void {
//   this.http
//     .post('http://localhost:your_dotnet_port/api/stripe/checkout', {
//       phoneNumber: this.phoneNumber,
//       items: this.cart.items,
//     })
//     .subscribe(async (res: any) => {
//       let stripe = await loadStripe('pk_test_...');
//       stripe?.redirectToCheckout({
//         sessionId: res.id,
//       });
//     });
}



