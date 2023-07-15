import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Product, ProductFakeApi } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';
import { ActivatedRoute } from '@angular/router';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  
})
export class HomeComponent  implements OnInit, OnDestroy {
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products :Product[] | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  productsSubscription: Subscription | undefined;
  private unsubscribe$ = new Subject<void>();
  

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private route: ActivatedRoute
    
  ) {}
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params['name']) {
        this.category = params['name'];
      }
    });
    this.getProducts();
    this.getProductss();
  }

  getProductss(): void {
    if(this.storeService.getproductToggel){
      this.storeService.getProducts().pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product[]) => {
        this.products  = data;
       
      });
    }
 }
  getProducts(): void {
     if(this.category != null){
      this.storeService.getProductBYCategory(this.category).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product[]) => {
        this.products  = data;
      });
     }
  
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
    console.log(ROWS_HEIGHT[colsNum]);

  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  OnshowCategoty(newCatagory : string): void{
    this.category = newCatagory;
    this.getProducts();
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.categoryName,
      name: product.title,
      price: product.price,
      quantity: 1,
      id:2,
      imageUrl: product.imageUrl,
      productId : product.productId
      
    });
  }
  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.unsubscribe();
    }
  }
}
