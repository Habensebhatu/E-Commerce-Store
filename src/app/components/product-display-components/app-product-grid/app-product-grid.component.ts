import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-app-product-grid',
  templateUrl: './app-product-grid.component.html',
  styleUrls: ['./app-product-grid.component.css']
})
export class AppProductGridComponent {
  
  @Input() products: Product[] | undefined;
  wishlistProductIds: string[] = [];
  private unsubscribe$ = new Subject<void>();
  constructor( private router: Router, private cartService: CartService, private wishlistService: WishlistService, private _snackBar: MatSnackBar){

  }
  navigateToProductDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }

  onAddToCart(product: Product): void {
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
  }

  isInWishlist(productId: string): boolean {
    return this.wishlistProductIds.includes(productId);
  }
  
  onAddToWishlist(productId: string) : void {
    if (!this.isInWishlist(productId)) {
      this.wishlistService.addToWishlist(productId);
      this.wishlistProductIds.push(productId); 
    } else {
      this._snackBar.open('Product is already in the wishlist.', 'Ok', {duration: 3000,});    
    }
  }
  fetchWishlistProductIds(): void {
    this.wishlistService.getWishlistProducts().pipe(takeUntil(this.unsubscribe$))
        .subscribe(products => {
            this.wishlistProductIds = products.map(product => product.productId);
        });
  }

}
