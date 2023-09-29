import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import { StoreService } from 'src/app/service/store.service';
import { WishlistService } from 'src/app/service/wishlist.service';
import Swiper from 'swiper';



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class  HomepageComponent{

  constructor( private storeService: StoreService, private wishlistService: WishlistService,  private _snackBar: MatSnackBar) {}
  cols: Observable<number> = of(4);
  private unsubscribe$ = new Subject<void>();
  trendingProducts : Product[] | undefined
  wishlistProductIds: string[] = [];
  slides = [
    {
      image: '../assets/image/bgwebshop.png',
     
    },
    {
      image: '../assets/image/bgslide.jpg',
      animationClass: 'layer-animation-3',
      promoTitle: 'limited edition',
      promoText: 'Sale Offer 20% Off This Week',
      mainTitle: 'Top Popular',
      mainSubtitle: 'Accessories 2022',
      subtitle: 'Light knit upper adapts to the shape of your foot for flexible and natural movement.',
      buttonUrl: 'shop-grid.html'
    },
  
  ];

  ngOnInit() {
    this.getProducts();
    this.fetchWishlistProductIds();
  }
  getProducts(): void {
    this.storeService.GetPopularProducts().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Product[]) => {
      this.trendingProducts = data;
      console.log("thisproducts",data)
      
    });
  
}
fetchWishlistProductIds(): void {
  this.wishlistService.getWishlistProducts().pipe(takeUntil(this.unsubscribe$))
      .subscribe(products => {
          this.wishlistProductIds = products.map(product => product.productId);
      });
}


isInWishlist(productId: string): boolean {
  return this.wishlistProductIds.includes(productId);
}

onAddToWishlist(productId: string) : void {
  if (!this.isInWishlist(productId)) {
    this.wishlistService.addToWishlist(productId);
    this.wishlistProductIds.push(productId); // Optionally update local list
  } else {
    this._snackBar.open('Product is already in the wishlist.', 'Ok', {duration: 3000,});
    console.log('Product is already in the wishlist.');
    // You can also provide user feedback like a toast message here if required
  }
}

  ngAfterViewInit() {
    setTimeout(() => {
        const primarySwiper = new Swiper('#primary_slider', {
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        const categoriesSwiper = new Swiper('#categories_slider', {
          slidesPerView: 4, // Display 4 images at once
          navigation: {
              nextEl: '.categories-slider-wrapper .swiper-arrow.next',
              prevEl: '.categories-slider-wrapper .swiper-arrow.prev',
          },
      });
      const trendingProducts = new Swiper('#trendingProducts_slider', {
        slidesPerView: 4, // Display 4 images at once
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
      },
    });
      
    }, 500); 
}



products = [
  {
    imageUrls: [{
      index: 0,
      file: '../assets/image/Berbere1.jpg'
    }],
    title: 'berbere',
    price: 71.05,
      categoryName: 'food',
      productId: "jhjjjk",
  CategoryId: "vvvvvvv",
   description: "hhjdfhjfjhd",
    quantity: 3,
    sessionId : 'ddd445556',
    isPopular: true
  },
  {
   
    imageUrls: [{
      index: 0,
      file: '../assets/image/Tafelloper.avif'
    }],
    title: 'hairStyle',
    price: 21.05,
    categoryName: 'cosmetica',
    productId: "jhjjjk",
  CategoryId: "vvvvvvv",
   description: "hhjdfhjfjhd",
    quantity: 3,
    sessionId : 'ddd445556',
    isPopular: true
},
{
  imageUrls: [{
    index: 0,
    file: '../assets/image/Koffieserveertafel.avif'
  }],
  title: 'Koffieserveertafel',
  price: 200.76,
  categoryName: 'cosmetica',
  productId: "jhjjjk",
  CategoryId: "vvvvvvv",
   description: "hhjdfhjfjhd",
    quantity: 3,
    sessionId : 'ddd445556',
    isPopular: true
},
{
  imageUrls: [{
    index: 0,
    file: '../assets/image/jurk.avif'
  }],
  title: 'jurk',
  price: 61.20,
  categoryName: 'Kleding',
  productId: "jhjjjk",
  CategoryId: "vvvvvvv",
   description: "hhjdfhjfjhd",
    quantity: 3,
    sessionId : 'ddd445556',
    isPopular: true
},
{
  imageUrls: [{
    index: 0,
    file: '../assets/image/Tafelloper.avif'
  }],
  title : 'Tafle',
  price: 55.86,
  categoryName: 'Cosmetica',
  productId: "jhjjjk",
  CategoryId: "vvvvvvv",
   description: "hhjdfhjfjhd",
    quantity: 3,
    sessionId : 'ddd445556',
    isPopular: true
} 
];

}



