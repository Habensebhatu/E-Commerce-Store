import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-app-view-toggle',
  templateUrl: './app-view-toggle.component.html',
  styleUrls: ['./app-view-toggle.component.css']
})
export class AppViewToggleComponent {

  @Output() viewChanged = new EventEmitter<'grid' | 'list'>();

  activeView: 'grid' | 'list' = 'grid'; 

  toggleView(view: 'grid' | 'list') {
    this.activeView = view;
    this.viewChanged.emit(this.activeView);
  }
}
