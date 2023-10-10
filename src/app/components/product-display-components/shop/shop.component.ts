import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription,  takeUntil } from 'rxjs';
import { Category } from 'src/app/Models/category.Model';
import { Product} from 'src/app/Models/product.model';
import { StoreService } from 'src/app/service/store.service';


@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  prices = ['0 - €5,00, ', '€5,00 - €10,00', '€10,00 - €15,00','€15,00 - €20,00', '€20,00 -  €25,00', '25,00 Eur & meer']
  activeView: 'grid' | 'list' = 'grid';
  products :Product[] | undefined;
  commingProducts : Product [] | undefined;
  count = '12';
  sort = 'desc';
  category:  string | undefined;
  minNumber: number | undefined;
  maxNumber: number | undefined;
  productsSubscription: Subscription | undefined;
  private unsubscribe$ = new Subject<void>();
  private subs: Subscription = new Subscription();
  categories: Category[] | undefined;
  selectedCategory: string | undefined;
  selectedPrice: string | undefined;

  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router, 
  ) {}
 
  async ngOnInit() {
    await this.getProducts(); 
  
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategory = params['category'];
        this.category = this.selectedCategory;
        this.filterByCategory(this.commingProducts!);
      }
      if (params['price']) {
        this.selectedPrice = params['price'];
        this.OnfillterProductsBYPrice(this.selectedPrice!);
      }
    });
  
    this.subs.add(
      this.storeService.showData$.subscribe(show => {
        this.category = show;
        this.getProducts();
      })
    );
  
    this.route.params.subscribe(params => {
      if(params['name']) {
        this.category = params['name'];
        this.category = this.selectedCategory;
        this.storeService.setAllProducts(false);
      }
    });
  
    if(!this.category) {
      this.storeService.setAllProducts(true);
    }
  
    this.getCatogories();
  }
  
  
  
  async initializeProducts() {
    await this.getProducts();
  
    if (this.commingProducts) {
      if (this.selectedCategory) {
        this.filterByCategory(this.commingProducts);
      }
      if (this.selectedPrice) {
        this.OnfillterProductsBYPrice(this.selectedPrice);
      }
    }
  }
  
  getCatogories() {
    this.storeService.getCatogories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data:  Category[]) => {
        this.categories = data;
      });
  }


  async getProducts(): Promise<void> {
    return new Promise((resolve) => {
      this.storeService.getProducts().pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Product[]) => {
          this.commingProducts = data;
          if (this.storeService.isAllProducts()){
            this.products = data;
          } else if(this.category != null ){
            this.filterByCategory(this.commingProducts);
          } else if (this.minNumber != null && this.maxNumber){
            this.filterByPrice(this.commingProducts);
          }
          resolve();  
        });
    });
  }

 filterByCategory(products: Product[]){
   const filterProductbyCategory = products.filter(p=> p.categoryName == this.category)
   if(!this.selectedPrice){
    console.log("dhbjdkdjdksdskdckhj")
   this.products = filterProductbyCategory;
   }
   
   
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
    const filterProductbyprice = products.filter(p => p.price >= this.minNumber!  && p.categoryName == this.category)
        this.products = filterProductbyprice
   }
  }

  OnfillterProductsBYPrice(filltedProduct : string): void { 
    console.log("illtedProductilltedProductilltedProduct") 
    let numbers = filltedProduct.match(/(\d+[\.,\d]*)/g);
    this.selectedPrice = filltedProduct;
    if (numbers && numbers.length >= 2) {
        this.minNumber = parseFloat(numbers[0].replace(',', '.'));
        this.maxNumber = parseFloat(numbers[1].replace(',', '.'));
    } else if (numbers && numbers.length === 1) {
        this.minNumber = parseFloat(numbers[0].replace(',', '.'));
        this.maxNumber = undefined;  
    }
    console.log("this.commingProducts!",this.commingProducts!) 
    this.filterByCategoryAndPrice(this.commingProducts!);
    this.filterByPrice(this.commingProducts!);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: this.selectedCategory, price: filltedProduct },
      queryParamsHandling: 'merge'
    });
}

filterByCategoryAndPrice(products: Product[]) {
  console.log("productsen")
  if(this.category && (this.minNumber !== undefined || this.maxNumber !== undefined)) {
    console.log("this.products", products)
      this.products = products.filter(p => 
          p.categoryName === this.category &&
          (this.minNumber ? p.price >= this.minNumber : true) &&
          (this.maxNumber ? p.price <= this.maxNumber : true)
      );
  } else if(this.category) {
      this.products = products.filter(p => p.categoryName === this.category);
  } else if(this.minNumber !== undefined || this.maxNumber !== undefined) {
      this.products = products.filter(p => 
          (this.minNumber ? p.price >= this.minNumber : true) &&
          (this.maxNumber ? p.price <= this.maxNumber : true)
      );
  } else {
      this.products = products;
  }
}

  OnshowCategoty(newCatagory : string): void{
    this.category = newCatagory;
    this.filterByCategory(this.commingProducts!)
    this.selectedCategory = newCatagory;
    this.filterByCategoryAndPrice(this.commingProducts!);
     this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: newCatagory, price: this.selectedPrice },
      queryParamsHandling: 'merge'
    });
  }

  
  navigateToProductDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }
  

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }
   
  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.unsubscribe();
    }
    this.subs.unsubscribe();
  }
  
  onViewChanged(view: 'grid' | 'list') {
    this.activeView = view;
  }
  
}
