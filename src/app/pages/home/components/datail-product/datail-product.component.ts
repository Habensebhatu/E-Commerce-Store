import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
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
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    
  ) {}
  productimage = [
   'Agor_Feet_Mask_1_1024x1024@2x.jpeg',
      'Agor_Feet_Mask_1_1024x1024@2x.jpeg',
    'Agor_Feet_Mask_1_1024x1024@2x.jpeg',
  'abu-walaad.jpeg',
  ]
  ngOnInit() {

    this.route.params.subscribe(params => {
      if(params['productId']) {
         this.productId =  params['productId']
         
      }
    });

    // Get the current product.
    this.getProduct();
    this.getRelatedProducts(); // Get the related products.
    // this.selectedImage = this.product.images[0]; // Initially display the first image.
  }

  getProduct() {
    this.storeService.getProductsById(this.productId!).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product) => {
      this.product = data
       console.log('products',this.product)
      });
  }

  getRelatedProducts() {
    // Your logic to fetch related products.
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.unsubscribe();
    }
  }
  
}
