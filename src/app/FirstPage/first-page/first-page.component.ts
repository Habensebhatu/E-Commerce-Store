import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, of } from 'rxjs';


@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page-component.css']
   
})
export class FirstPageComponent {

  constructor(private breakpointObserver: BreakpointObserver){

  }
  imageulr =  '../assets/image/slide-1.jpg';
  cols: Observable<number> = of(4);
  slides = [
    {
      image: '../assets/image/slide-1.jpg',
      animationClass: 'layer-animation-3',
      promoTitle: 'limited edition',
      promoText: 'Sale Offer 20% Off This Week',
      mainTitle: 'Top Popular',
      mainSubtitle: 'Accessories 2022',
      subtitle: 'Light knit upper adapts to the shape of your foot for flexible and natural movement.',
      buttonUrl: 'shop-grid.html'
    },
    // other slides go here...
  ];

  ngOnInit() {
    this.cols = this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).pipe(
      map(({ matches }) => {
        if (matches) {
          if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
            return 2;
          }
          if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
            return 2;
          }
          return 4;
        } else {
          return 4; // Ensure cols always have a number.
        }
      })
    );
  }
  
  
  items = [
    {
        category: 'Food',
        image: 'Berbere1.jpg',
        
    },
    {
        category: 'Cosmetica',
        image: 'HairStyle .avif',
       
    },
    {
      category: 'Kleding',
      image: 'Ethiopische jurk.webp',
      
    },
    {
      category: 'Food',
      image: 'Sieraden.jpeg',
    
    },
   
    // ... add more items as needed
];

}
