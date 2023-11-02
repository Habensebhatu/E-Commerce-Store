
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import {  Cart, CartI, Product, ProductAddCart } from 'src/app/Models/product.model';
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
  
  dataSource : Array<ProductAddCart> = [];
  dataSourc : Array<ProductAddCart> = [];
  Products : Array<ProductAddCart> = [];
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
  // this.mockData();
  this.cartService.cart.subscribe((_cart: CartI)=>{
    this.cart = _cart;
    this.Products = this.cart.items;
    this.dataSource = this.cart.items;
    console.log("cardrd", this.cart)
   
  })
  
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
  console.log('testes', this.cart.items)
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

// mockData(){
//   this.dataSourc = [
//     {
//       productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       title: "string",
//       price: 23,
//       description: "string",
//       imageUrl: "../assets/image/Berbere1.jpg",
//       quantity: 3,
//       categoryName: "string",
//       sessionId: "string",
//       categoryId: "327837893928"
//     },
//     {
//       productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       title: "string",
//       price: 23,
//       description: "string",
//       imageUrl: "../assets/image/Berbere1.jpg",
//       quantity: 3,
//       categoryName: "string",
//       sessionId: "string",
//       categoryId: "327837893928"
//     },
//     {
//       productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       title: "string",
//       price: 23,
//       description: "string",
//       imageUrl: "../assets/image/Berbere1.jpg",
//       quantity: 3,
//       categoryName: "string",
//       sessionId: "string",
//       CategoryId: "327837893928"
//     },
//     {
//       productId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
//       title: "string",
//       price: 23,
//       description: "string",
//       imageUrl: "../assets/image/Berbere1.jpg",
//       quantity: 3,
//       categoryName: "string",
//       sessionId: "string",
//       CategoryId: "327837893928"
//     }
//   ]
  
  
// }

}



