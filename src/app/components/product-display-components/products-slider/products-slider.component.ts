import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/Models/product.model";
import Swiper from "swiper";

@Component({
  selector: "app-products-slider",
  templateUrl: "./products-slider.component.html",
  styleUrls: ["./products-slider.component.css"],
})
export class ProductsSliderComponent {
  @Input() products: Product[] = [];
  @Input() context: "home" | "productDetails" = "home";
  @Output() productClicked = new EventEmitter<Product>();

  constructor(private router: Router) {}

  loading = true;

  ngOnInit() {
    setTimeout(() => {
      this.loading = false; // Set to false when loading is complete
    }, 1000);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const categoriesSwiper = new Swiper("#categories_slider", {
        slidesPerView: 4, // Display 4 images at once
        spaceBetween: 20,
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
    }, 500);
  }

  handleProductClick(product: Product) {
    if (this.context === "home") {
      // Navigate to categories page
      this.router.navigate(["/shop", product.categoryName]);
    } else if (this.context === "productDetails") {
      // Emit an event to change the product details or do whatever you want
      this.productClicked.emit(product);
    }
  }
}
