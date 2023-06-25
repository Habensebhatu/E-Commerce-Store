import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html'
    
})
export class FiltersComponent {
  @Output() ShowCategory = new EventEmitter<string>();
  categories = ['shoes', 'sports'];
 
  OnShowCategory(category : string){
    console.log(category);
    this.ShowCategory.emit(category);
  }

}
