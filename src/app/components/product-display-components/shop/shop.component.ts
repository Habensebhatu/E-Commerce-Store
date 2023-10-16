import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subject, Subscription, takeUntil } from "rxjs";
import { Category } from "src/app/Models/category.Model";
import { Product } from "src/app/Models/product.model";
import { StoreService } from "src/app/service/store.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.css"],
})
export class ShopComponent {
  prices = [
    "0 - €5,00, ",
    "€5,00 - €10,00",
    "€10,00 - €15,00",
    "€15,00 - €20,00",
    "€20,00 -  €25,00",
    "25,00 Eur & meer",
  ];
  activeView: "grid" | "list" = "grid";
  products: Product[] | undefined;
  commingProducts: Product[] | undefined;
  count = "12";
  sort = "desc";
  category: string | undefined;
  minNumber: number | undefined;
  maxNumber: number | undefined;
  productsSubscription: Subscription | undefined;
  private unsubscribe$ = new Subject<void>();
  private subs: Subscription = new Subscription();
  categories: Category[] | undefined;
  selectedCategory: string | undefined;
  selectedPrice: string | undefined;
  currentPage: number = 1;
  pageSize: number = 3;
  totalProductsOfCategory: number | undefined;
  Math = Math;
  
  constructor(
    private storeService: StoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.getProducts();
    this.route.queryParams.subscribe((params) => {
      if (params["category"]) {
        this.selectedCategory = params["category"];
        this.category = this.selectedCategory;
        this.filterByCategory(this.selectedCategory!);
      }
      if (params["price"]) {
        this.selectedPrice = params["price"];
        this.OnfillterProductsBYPrice(this.selectedPrice!);
      }
    });

    this.getCategoryByURL();
    this.getCatogories();
  
  }

  getCategoryByURL() {
    if (this.selectedCategory == null) {
      this.route.params.subscribe((params) => {
        if (params["name"]) {
          this.category = params["name"];
          this.filterByCategory(this.category!);
        }
      });
    }
  }

  getCatogories() {
    this.storeService
      .getCatogories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Category[]) => {
        this.categories = data;
      });
  }

  filterByCategory(category: string) {
    this.storeService
      .getProductBYCategory(category, this.currentPage, this.pageSize)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product[]) => {
        if (
          this.minNumber == undefined &&
          this.maxNumber == undefined &&
          this.selectedPrice == null
        ) {
          this.products = data;
        } 
      });
  }

  OnshowCategoty(newCatagory: string): void {
    this.getProducts();
    this.category = newCatagory;
    this.filterByCategory(this.selectedCategory!);
    this.selectedCategory = newCatagory;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category: newCatagory, price: this.selectedPrice },
      queryParamsHandling: "merge",
    });
  }

  getProducts() {
    this.storeService
      .getProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product[]) => {
        this.commingProducts = data;
        this.getTotalProductsBycategory();
      });
  }

  getTotalProductsBycategory() {
    const filterProductbycategory = this.commingProducts?.filter(
      (p) => p.categoryName == this.category
    );
    if(this.selectedPrice == undefined){
      this.totalProductsOfCategory = filterProductbycategory!.length;
    }
   
  }

  get totalPages(): number {
    if (this.totalProductsOfCategory === undefined || this.totalProductsOfCategory === 0) {
        return 0;
    }
    return Math.ceil(this.totalProductsOfCategory / this.pageSize);
}

  OnfillterProductsBYPrice(filltedProduct: string): void {
    let numbers = filltedProduct.match(/(\d+[\.,\d]*)/g);
    this.selectedPrice = filltedProduct;
    if (numbers && numbers.length >= 2) {
      this.minNumber = parseFloat(numbers[0].replace(",", "."));
      this.maxNumber = parseFloat(numbers[1].replace(",", "."));
    } else if (numbers && numbers.length === 1) {
      this.minNumber = parseFloat(numbers[0].replace(",", "."));
      this.maxNumber = undefined;
    }
    this.getProductsByNameAndPrice();
  }
     
  getProductsByNameAndPrice(){
    console.log("this.maxNumber", this.maxNumber)
    if (this.minNumber !== undefined || this.maxNumber !== undefined) {
      this.storeService.getProductsByNameAndPrice({
        category: this.category!,
        minPrice: this.minNumber!,
        pageNumber: this.currentPage,
        pageSize: this.pageSize,
        maxPrice: this.maxNumber // This is optional, so it's okay if it's undefined
    }).subscribe((data) => {
        console.log("datararat", data)
        this.products = data;
        this.totalProductsOfCategory = data.length;
    });
    }
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { category:this.category, price: this.selectedPrice },
      queryParamsHandling: "merge",
    });
  }

  
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
  }
    if (this.selectedCategory == undefined && this.selectedPrice == undefined) {
      this.filterByCategory(this.category!);
    }
    if (this.selectedCategory && this.selectedPrice == undefined) {
      this.filterByCategory(this.selectedCategory!);
    } 
    
    else {
      this.getProductsByNameAndPrice()
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    if (this.selectedCategory == undefined) {
      this.filterByCategory(this.category!);
    } else {
      this.filterByCategory(this.selectedCategory!);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }

    if (this.selectedCategory == undefined) {
      this.filterByCategory(this.category!);
    } else {
      this.filterByCategory(this.selectedCategory!);
    }
  }

  
  navigateToProductDetails(productId: string): void {
    this.router.navigate(["product", productId]);
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.unsubscribe();
    }
    this.subs.unsubscribe();
  }

  onViewChanged(view: "grid" | "list") {
    this.activeView = view;
  }
}

// filterByCategoryAndPrice(products: Product[]) {
  //   if (this.minNumber !== undefined || this.maxNumber !== undefined) {
  //     this.products! = products.filter(
  //       (p) =>
  //         (this.minNumber ? p.price >= this.minNumber : true) &&
  //         (this.maxNumber ? p.price <= this.maxNumber : true)
  //     );
  //   }
  //   this.hidePaganition = this.products!.length;
  // }


// filterByPrice(products: Product[]) {
//   if (this.storeService.isAllProducts()) {
//     const filterProductbyprice = products.filter(
//       (p) => p.price >= this.minNumber! && p.price <= this.maxNumber!
//     );
//     this.products = filterProductbyprice;
//   } else if (!this.storeService.isAllProducts() && !isNaN(this.maxNumber!)) {
//     const filterProductbyprice = products.filter(
//       (p) =>
//         p.price >= this.minNumber! &&
//         p.price <= this.maxNumber! &&
//         p.categoryName == this.category
//     );
//     this.products = filterProductbyprice;
//   } else if (!this.storeService.getAllProducts && isNaN(this.maxNumber!)) {
//     const filterProductbyprice = products.filter(
//       (p) => p.price >= this.minNumber! && p.categoryName == this.category
//     );
//     this.products = filterProductbyprice;
//   }
// }
// async getProducts(): Promise<void> {
//   return new Promise((resolve) => {
//     this.storeService
//       .getProducts()
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe((data: Product[]) => {
//         this.commingProducts = data;
//         if (this.storeService.isAllProducts()) {
//           //  this.products = data
//         } else if (this.category != null) {
//           this.filterByCategory();
//         } else if (this.minNumber != null && this.maxNumber) {
//           this.filterByPrice(this.commingProducts);
//         }
//         resolve();
//       });
//   });
// }

// async initializeProducts() {
//   await this.getProducts();
//   console.log("this.getProducts");
//   if (this.commingProducts) {
//     if (this.selectedCategory) {
//       this.filterByCategory();
//     }
//     if (this.selectedPrice) {
//       this.OnfillterProductsBYPrice(this.selectedPrice);
//     }
//   }
// }

// this.subs.add(
//   this.storeService.showData$.subscribe((show) => {
//     this.category = show;
//     // this.getProducts();
//   })
// );

// if (!this.category) {
//   this.storeService.setAllProducts(true);
// }
