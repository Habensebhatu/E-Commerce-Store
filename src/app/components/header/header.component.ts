import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
import { Cart, CartI, Product, ProductAddCart } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart: CartI = { items: [] };
  itemsQuantity = 0;
  categories = ['Food', 'Kleding', 'Cosmetica', 'Koffieserveertafel']
  searchValue: string | undefined;
  noProductsFound: boolean = false;
  @ViewChild('cartTrigger') cartMenuTrigger!: MatMenuTrigger;
  languageMenu = false;
  @Input()
  get cart(): CartI {
    return this._cart;
  }
 log = 'logo.png';
 Nederland = 'Nederlands-flag.png'
 Eritrea = 'Eritrea-flag.png'
 private unsubscribe$ = new Subject<void>();
  constructor(private cartService: CartService,  private storeService: StoreService,) {}
  ngOnInit(): void {
    this.cartService.showMenu$.subscribe(() => {
      this.openCartMenu();
    });
  }
  openCartMenu(): void {
    this.cartMenuTrigger?.openMenu();
  }

  // getCatogories() {
  //   this.storeService.getCatogories()
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((data:  Category[]) => {
  //       this.categories = data;
  //       console.log("category",this.categories)
  //     });
  // }
  language(){
    this.languageMenu = true
  }
  search(){
    
    // let searchResults = this.performSearch(this.searchValue)
    // if (searchResults.length === 0) {
    //   this.noProductsFound = true;
    // } else {
    //   this.noProductsFound = false;
    // }
    this.noProductsFound = true;
  }

  onCategorySelect(category: string): void {
    console.log('You selected: ', category);
    // Do something with category
  }

  
  
  set cart(cart: CartI) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }

  

  getTotal(items: ProductAddCart[]): number {
    return this.cartService.getTotal(items);
  }

  categoriesChange(category : string){
   
    this.storeService.changeShowData(category)
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }
}
