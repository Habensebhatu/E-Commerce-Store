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
  relatedProducts: Product[] = []; // A list of related products.
  selectedImage: string | undefined; // The currently selected image.
  private unsubscribe$ = new Subject<void>();
  Quetity = 1;
  categoryName: string| undefined;
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService,
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['productId']) {
        this.productId =  params['productId']
      }
    });
    this.getProduct();
  }
  
  getProduct() {
    this.storeService.getProductsById(this.productId!).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product) => {
        this.product = data
        console.log('data.imageUrls', data.categoryName)
        this.selectedImage = data.imageUrls[0].file;
        this.getProductBYCategory();
      });
  }
  
  getProductBYCategory() {
    console.log('this.product?.categoryName!',this.product?.categoryName!)
    if (this.product?.categoryName) {
      this.storeService.getProductBYCategory(this.product.categoryName).pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Product[]) => {
          this.relatedProducts = data;
          console.log('this.relatedProducts', this.relatedProducts);
        });
    }
  }
  changeProductDetails(product: Product) {
    // Update your product details with the clicked product
    this.product = product;
    this.selectedImage = product.imageUrls[0].file;
    // Fetch related products for the newly selected product
    this.getProductBYCategory();
  }
  

  displayedRelatedProducts: string[] = [];
currentIndex = 0;

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
        imageUrl: this.product.imageUrls[0].file,
        productId: this.product.productId,
        CategoryId: this.product.CategoryId,
        description: this.product.description,
        sessionId: this.product.sessionId

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
