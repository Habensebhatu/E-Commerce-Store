import { Component, Input, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Subject, takeUntil } from 'rxjs';
import { Category } from 'src/app/Models/category.Model';
import { Cart, CartI, Product, ProductAddCart } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart: CartI = { items: [] };
  itemsQuantity = 0;
  categories: Category[] | undefined
  searchResults: Product[] = [];
  @ViewChild('cartTrigger') cartMenuTrigger!: MatMenuTrigger;
  @ViewChild('searchMenuTrigger')
  searchMenuTrigger!: MatMenuTrigger;
  languageMenu = false;
  @Input()
  get cart(): CartI {
    return this._cart;
  }
 log = 'logo.png';
 Nederland = 'Nederlands-flag.png'
 Eritrea = 'Eritrea-flag.png'
 private unsubscribe$ = new Subject<void>();
  constructor(private cartService: CartService,  private storeService: StoreService, private router: Router) {}
  ngOnInit(): void {
    this.cartService.showMenu$.subscribe(() => {
      this.openCartMenu();
    });
    this.getCatogories();
    
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.clearInput();
      }
    });
  }
  clearInput() {
    const inputElement = document.querySelector('.search-input') as HTMLInputElement;
    if (inputElement) {
      inputElement.value = '';
    }
  }
  openCartMenu(): void {
    this.cartMenuTrigger?.openMenu();
  }

  searchProducts(event: Event) {
    const input = event.target as HTMLInputElement;
    const query = input.value;
  
    if (query.trim() === '') {
      this.searchResults = [];
      return;
    }  
    this.storeService.searchProducts(query)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products: Product[]) => {
        this.searchResults = products;
        if (products.length > 0) {
          this.searchMenuTrigger.openMenu(); // Open the menu when there are results
        } else {
          this.searchMenuTrigger.closeMenu(); // Close the menu if there are no results
        }
      });
  }
  

  getCatogories() {
    this.storeService.getCatogories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data:  Category[]) => {
        this.categories = data;
        console.log("category",this.categories)
      });
  }
  language(){
    this.languageMenu = true
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
