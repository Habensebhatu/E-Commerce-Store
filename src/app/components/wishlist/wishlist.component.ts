import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Product, ProductAddCart } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {

  constructor(private cartService: CartService, private wishlistService: WishlistService ){}
  private unsubscribe$ = new Subject<void>();
  wishlistProducts : Product[] | undefined


  ngOnInit() {
    this.getWishlistProducts();
  }

  getWishlistProducts(){
    this.wishlistService.getWishlistProducts().pipe(takeUntil(this.unsubscribe$))
    .subscribe((data: Product[]) => {
      this.wishlistProducts = data;
      console.log("this.wishlistProducts",data)
      
    });
  }

  onAddToCart(product: Product): void {
    console.log("product:product:", product)
    this.cartService.addToCart({
      categoryName: product.categoryName,
      title: product.title,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrls[0].file,
      productId: product.productId,
      CategoryId: product.CategoryId,
      description: product.description,
      sessionId : product.sessionId
    });
    console.log("imageURls", product.imageUrls[0].file,)
  }

  
  products = [
    {
      imageUrls: [{
        index: 0,
        file: 'https://imagestorewebshop.blob.core.windows.net/blolcontainerws/Berbere1.jpg'
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
