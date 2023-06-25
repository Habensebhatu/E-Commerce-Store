import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  
})
export class HomeComponent  implements OnInit, OnDestroy {
  cols = 3;
  catagory : string | undefined
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private storeService: StoreService
    
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
  this.storeService
      .getAllProducts(this.count, this.sort)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
    console.log(ROWS_HEIGHT[colsNum]);

  }
  OnshowCategoty(newCatagory : string): void{
    console.log(newCatagory);
    this.catagory = newCatagory;
  }

  onAddToCart(product: Product): void {
    console.log(product);
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
