import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Category } from 'src/app/Models/category.Model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.css']
    
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() ShowCategory = new EventEmitter<string>();
  @Output() FilltedProductByPrice = new EventEmitter<string>();
  categories: Category[] | undefined;
  categoriesSubscription: Subscription | undefined;
  private unsubscribe$ = new Subject<void>();
  selectedCategory: string = '';
  
  constructor(private storeService: StoreService) {}
 
  prices = ['0 -  5 Eur ', '5 - 10 Eur', '10 - 15 Eur','15 - 20 Eur', '20 -  25Eur', '25 Eur & meer']
  ngOnInit(): void {
      this.getCatogories();
  }
  getCatogories() {
    this.storeService.getCatogories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data:  Category[]) => {
        this.categories = data;
      });
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
   
  fillterPrices(selectedPrice : string){
   this.FilltedProductByPrice.emit(selectedPrice)
   
}

  OnShowCategory(categoryName : string): void{
    this.selectedCategory = categoryName;
    console.log("categoryName", this.selectedCategory)
    this.ShowCategory.emit(categoryName);
  }

}
