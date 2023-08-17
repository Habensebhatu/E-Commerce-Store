import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';

@Component({
  selector: 'app-datail-product',
  templateUrl:'./datail-product.component.html' 
})
export class DatailProductComponent {
  productId: string | undefined;
  product: Product | undefined; // Assume Product is a model with properties: title, price, description, images etc.
  relatedProducts: Product[] | undefined; // A list of related products.
  selectedImage: string | undefined; // The currently selected image.
  private unsubscribe$ = new Subject<void>();
  Quetity = 1
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService,
  ) {}
  RelatedProducts = [
   'Lichaamsdelen.jpg',
   'ADEYABEBA.avif',
   'Beddengoedset.webp',
  'fauxTas4.jpeg',
  'Mesob.webp',
  'netsela.jpeg',
  'HairStyle .avif',
  'Ethiopische jurk.webp'
  
  ]
  ngOnInit() {

    this.route.params.subscribe(params => {
      if(params['productId']) {
         this.productId =  params['productId']
         
      }
    });
    this.getProduct();
    this.updateDisplayedProducts();
  }

  getProduct() {
    this.storeService.getProductsById(this.productId!).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product) => {
      this.product = data
      this.selectedImage = data.imageUrls[0];

      });
  }

  displayedRelatedProducts: string[] = [];
currentIndex = 0;

// ... Other properties and methods ...

showPrevious() {
    if (this.currentIndex >= 4) {
        this.currentIndex -= 4;
        this.updateDisplayedProducts();
    }
}

showNext() {
    if (this.currentIndex + 4 < this.RelatedProducts.length) {
        this.currentIndex += 4;
        this.updateDisplayedProducts();
    }
}

updateDisplayedProducts() {
    this.displayedRelatedProducts = this.RelatedProducts.slice(this.currentIndex, this.currentIndex + 4);
}


    onRemoveQuantity(){
    if(this.Quetity > 1){
       this.Quetity--;
    }
    else(
      this.Quetity
    )
  }

  onAddQuantity(){
   this.Quetity++;
  }

  onAddToCart(): void {
    if(this.product){
      this.cartService.addToCartFromProductDetail({
        categoryName: this.product.categoryName,
        title: this.product.title,
        price: this.product.price,
        quantity: this.Quetity,
        imageUrl: this.product.imageUrls[0],
        productId: this.product.productId,
        CategoryId: this.product.CategoryId,
        description: this.product.description
      });
    }
    this.cartService.show();
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.unsubscribe();
    }
  }
  
}
