import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import {CartI,  ProductAddCart } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html' 
 
})
export class CartComponent {
  phoneNumber = '061790373929';
  cart: CartI = {items:[
  ]
  }
  
  Products : Array<ProductAddCart> = [];
  
constructor(private cartService: CartService, private http: HttpClient, private storeService: StoreService){}
ngOnInit(){
  this.cartService.cart.subscribe((_cart: CartI)=>{
    this.cart = _cart;
    this.Products = this.cart.items;
  })
  
}

getLastProductCategory() {
  if (this.Products && this.Products.length > 0) {
    return this.Products[this.Products.length - 1].categoryName;
  }
  return ''; 
}

getTotalQuantity(items: ProductAddCart[]): number {
  return items.reduce((prev, current) => prev + current.quantity, 0);
}

getTotal(items: ProductAddCart[]): number {
  return this.cartService.getTotal(items);
  
}

getProducts(){
  this.storeService.setAllProducts(true);
  }

onAddQuantity(item: ProductAddCart): void {
  console.log("Quantity", item)
  this.cartService.addToCart(item);
}

onRemoveQuantity(item: ProductAddCart): void {
  this.cartService.removeQuantity(item);
}


onClearCart(): void {
  this.cartService.clearCart();
}

onRemoveFromCart(item: ProductAddCart): void {
  this.cartService.removeFromCart(item);
}
onCheckout(): void {
  this.http
    .post('https://webshopfilimon.azurewebsites.net/api/Stripe/checkout', {
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



