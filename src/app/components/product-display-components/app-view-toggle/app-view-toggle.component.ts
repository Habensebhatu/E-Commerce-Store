import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-app-view-toggle',
  templateUrl: './app-view-toggle.component.html',
  styleUrls: ['./app-view-toggle.component.css']
})
export class AppViewToggleComponent {

  @Output() viewChanged = new EventEmitter<'grid' | 'list'>();
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 1;
  @Input()  totalProductsOfCategory: number | undefined;
  activeView: 'grid' | 'list' = 'grid'; 
  Math = Math;

  toggleView(view: 'grid' | 'list') {
    this.activeView = view;
    this.viewChanged.emit(this.activeView);
  }
}
