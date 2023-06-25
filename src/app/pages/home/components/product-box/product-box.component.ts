import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl:'./product-box.component.html' 
    
})
export class ProductBoxComponent {
@Input() fullWidthMode = false;
@Input() product : Product | undefined;
@Output() addToCart = new EventEmitter();


// product: Product | undefined = {
//   id: 1,
//     title: "product",
//     price: 150,
//     category: 'shoes',
//     description: 'Description',
//     image: 'https://via.placeholder.com/150'
// }

onAddToCart(): void {
  this.addToCart.emit(this.product);
  } 


}
