import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { Observable, Subject, of, takeUntil } from "rxjs";
import { Product } from "src/app/Models/product.model";
import { StoreService } from "src/app/service/store.service";
import { WishlistService } from "src/app/service/wishlist.service";
import Swiper from "swiper";

@Component({
  selector: "app-homepage",
  templateUrl: "./homepage.component.html",
  styleUrls: ["./homepage.component.css"],
})
export class HomepageComponent {
  constructor(
    private storeService: StoreService,
    private wishlistService: WishlistService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute, 
    private router: Router
  ) {}
  cols: Observable<number> = of(4);
  private unsubscribe$ = new Subject<void>();
  trendingProducts: Product[] | undefined;
  wishlistProductIds: string[] = [];
  slides = [
    {
      image: "../assets/image/bgwebshop.png",
    },
    {
      image: "../assets/image/bgslide.jpg",
      // image: "../assets/image/sofanishop.jpeg",
      animationClass: "",
      promoTitle: "",
      promoText: "",
      mainTitle: "",
      mainSubtitle: "",
      subtitle:
        "",
      buttonUrl: "",
    },
  ];

  loading = true;

  ngOnInit() {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     const fragment = this.route.snapshot.fragment;
    //     if (fragment) {
    //       const element = document.querySelector('#' + fragment);
    //       if (element) element.scrollIntoView();
    //     }
    //   }
    // });
    this.getProducts();
    this.fetchWishlistProductIds();

    setTimeout(() => {
      this.loading = false; // Set to false when loading is complete
    }, 1000);
  }
  getProducts(): void {
    this.storeService
      .GetPopularProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product[]) => {
        this.trendingProducts = data;
      });
  }
  fetchWishlistProductIds(): void {
    this.wishlistService
      .getWishlistProducts()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((products) => {
        this.wishlistProductIds = products.map((product) => product.productId);
      });
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }

  onAddToWishlist(productId: string): void {
    if (!this.isInWishlist(productId)) {
      this.wishlistService.addToWishlist(productId);
      this.wishlistProductIds.push(productId);
    } else {
      this._snackBar.open("Product is already in the wishlist.", "Ok", {
        duration: 3000,
      });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const primarySwiper = new Swiper("#primary_slider", {
        slidesPerView: 1,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: ".swiper-arrow.next",
          prevEl: ".swiper-arrow.prev",
        },

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });

      const categoriesSwiper = new Swiper("#categories_slider", {
        spaceBetween: 20,
        speed: 400,
        navigation: {
          nextEl: ".swiper-arrow.next",
          prevEl: ".swiper-arrow.prev",
        },

        breakpoints: {
          992: {
            slidesPerView: 4,
          },

          767: {
            slidesPerView: 3,
          },

          450: {
            slidesPerView: 2,
          },

          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });
      const trendingProducts = new Swiper("#trendingProducts_slider", {
        slidesPerView: 4, // Display 4 images at once
        spaceBetween: 20,
        speed: 2000,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },

        

        breakpoints: {
          992: {
            slidesPerView: 4,
          },

          767: {
            slidesPerView: 3,
          },

          450: {
            slidesPerView: 2,
          },

          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
        },
      });
    }, 500);
  }

  products = [

    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/Eritreseklederdracht.jpg",
        },
      ],
      title: "Tilf Habesha/ትልፍ ሓበሻ",
      price: 103,
      categoryName: "Kleding",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
    },
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/fidelat.jpeg",
        },
      ],
      title: "Tigrigna Alphabets/ ፊደላት ትግርኛ",
      price: 15.90,
      categoryName: "Boeken",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
    },
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/HairStyle.jpg",
        },
      ],
      title: "hairStyle/ኣርቲፊሻል ጸጉሪ",
      price: 21.05,
      categoryName: "Cosmetica",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
    },
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/Berbere1.jpg",
        },
      ],
      title: "berbere Spice /በርበሬ",
      price: 20,
      categoryName: "Voedsel",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
    },
   
    {
      imageUrls: [
        {
          index: 0,
          file: "../assets/image/Bellamegogo1.jpeg",
        },
      ],
      title: "Bella Megogo (ዓብይ መጎጎ)",
      price: 543,
      categoryName: "keuken",
      productId: "jhjjjk",
      categoryId: "vvvvvvv",
      description: "hhjdfhjfjhd",
      quantity: 3,
      sessionId: "ddd445556",
      isPopular: true,
    },
   
    
  ];

 
}
