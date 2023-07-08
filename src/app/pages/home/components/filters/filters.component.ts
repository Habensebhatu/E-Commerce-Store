import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Category } from 'src/app/Models/category.Model';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html'
    
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() ShowCategory = new EventEmitter<string>();
  // categories: string[] | undefined;
  categories: Category[] | undefined;
  categoriesSubscription: Subscription | undefined;
  private unsubscribe$ = new Subject<void>();
  
  constructor(private storeService: StoreService) {}
 
  ngOnInit(): void {
    // this.categoriesSubscription = this.storeService
    //   .getAllCategories()
    //   .subscribe((response: Array<string>) => {
    //     this.categories = response;
    //   });
      this.getCatogories();
  }
  getCatogories() {
    this.storeService.getCatogories()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data:  Category[]) => {
        this.categories = data;
        console.log("category",this.categories)
      });
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }

  OnShowCategory(category : string){
    console.log(category);
    this.ShowCategory.emit(category);
  }

}
