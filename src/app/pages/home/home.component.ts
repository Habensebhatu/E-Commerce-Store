import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription,  takeUntil } from 'rxjs';
import { Product} from 'src/app/Models/product.model';
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
  commingProducts : Product [] | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  minNumber: number | undefined;
  maxNumber: number | undefined;
  productsSubscription: Subscription | undefined;
  private unsubscribe$ = new Subject<void>();
  private subs: Subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private storeService: StoreService,
    private route: ActivatedRoute
    
  ) {}
 
  ngOnInit(): void {
   
    this.subs.add(
      this.storeService.showData$.subscribe(show => {
        this.category = show;
        // Now you can call any methods or perform any actions that should happen when category changes.
        this.getProducts();
      })
    );
    this.route.params.subscribe(params => {
      if(params['name']) {
        this.category = params['name'];
        this.storeService.setAllProducts(false);
      }
    });
    if(!this.category){
      this.storeService.setAllProducts(true);
    }
   console.log("tetstetstets")
   
  }

  getProducts(): void {
      this.storeService.getProducts().pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product[]) => {
        this.commingProducts = data
         if (this.storeService.isAllProducts()){
          this.products = data
         }  
        else if(this.category != null){
         this.filterByCategory(this.commingProducts)
        }
        else if (this.minNumber != null && this.maxNumber){
         this.filterByPrice(this.commingProducts)
         }
       
      });
    
 }

 filterByCategory(products: Product[]){
   const filterProductbyCategory = products.filter(p=> p.categoryName == this.category)
    this.products = filterProductbyCategory;
   
 }

 filterByPrice(products: Product[]) {
     if(this.storeService.isAllProducts()){
    const filterProductbyprice = products.filter(p => p.price >= this.minNumber! && p.price <= this.maxNumber!)
        this.products = filterProductbyprice
     }
     else if (!this.storeService.isAllProducts() &&  !isNaN(this.maxNumber!)){
    const filterProductbyprice = products.filter(p => p.price >= this.minNumber! && p.price <= this.maxNumber! && p.categoryName == this.category)
        this.products = filterProductbyprice
   }
   else if (!this.storeService.getAllProducts && isNaN(this.maxNumber!)){
    // if selected filter is 25€ to more 
    const filterProductbyprice = products.filter(p => p.price >= this.minNumber!  && p.categoryName == this.category)
        this.products = filterProductbyprice
   }
  }

  OnfillterProductsBYPrice(filltedProduct : string): void{  
    let numbers = filltedProduct.match(/(\d+)/g);
    if (numbers) {
      this.minNumber = parseFloat(numbers[0]);
      this.maxNumber = parseFloat(numbers[1]);
     console.log(this.minNumber, this.maxNumber)
  }
  this.filterByPrice(this.commingProducts!)
  }
   
  OnshowCategoty(newCatagory : string): void{
    this.category = newCatagory;
    this.filterByCategory(this.commingProducts!)
  }

  // getProductsByCategory(): void {
  //   //  if(this.category != null){
  //   //   this.storeService.getProductBYCategory(this.category).pipe(takeUntil(this.unsubscribe$))
  //   //   .subscribe((data: Product[]) => {
  //   //     this.products  = data;
  //   //   });
  //   //  }
   
  // }

//   getProductsByPrice(): void {
//     if(this.minNumber != null && this.maxNumber){
//      this.storeService.getProductBYPrice(this.minNumber, this.maxNumber).pipe(takeUntil(this.unsubscribe$))
//      .subscribe((data: Product[]) => {
//        this.products  = data;
//      });
//     }
 
//  }


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
   
  

  onAddToCart(product: Product): void {
    console.log("imageURls............")
    this.cartService.addToCart({
      categoryName: product.categoryName,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrls[0],
      productId: product.productId,
      CategoryId: product.CategoryId,
      description: product.description
    });
    console.log("imageURls")
  }
  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.unsubscribe();
    }
    this.subs.unsubscribe();
  }
  
}