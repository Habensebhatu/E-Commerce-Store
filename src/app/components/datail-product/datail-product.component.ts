import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Product } from 'src/app/Models/product.model';
import { CartService } from 'src/app/service/cart.service';
import { StoreService } from 'src/app/service/store.service';
import { WishlistService } from 'src/app/service/wishlist.service';

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
  wishlistProductIds: string[] = [];
  hovered = false;
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService,
    private cartService: CartService,
    private wishlistService: WishlistService,  private _snackBar: MatSnackBar
  ) {}
  
  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['productId']) {
        this.productId =  params['productId']
        this.getProduct();
      }
    });
    this.mockData();
  this.fetchWishlistProductIds();
  }
  
  getProduct() {
    this.storeService.getProductsById(this.productId!).pipe(takeUntil(this.unsubscribe$))
      .subscribe((data: Product) => {
        this.product = data
        console.log('data.imageUrls', data)
        this.selectedImage = data.imageUrls[0].file;
        this.getProductBYCategory();
        window.scrollTo(0, 0); 
      });
  }
  
  getProductBYCategory() {
    console.log('this.product?.categoryName!',this.product?.categoryName!)
    if (this.product?.categoryName) {
      this.storeService.getProductBYCategory(this.product.categoryName, this.currentPage, this.pageSize).pipe(takeUntil(this.unsubscribe$))
        .subscribe((data: Product[]) => {
          // this.relatedProducts = data;
          console.log('this.relatedProducts', this.relatedProducts);
        });
    }
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

  fetchWishlistProductIds(): void {
    this.wishlistService.getWishlistProducts().pipe(takeUntil(this.unsubscribe$))
        .subscribe(products => {
            this.wishlistProductIds = products.map(product => product.productId);
        });
  }
  
  
  isInWishlist(): boolean {
    return this.wishlistProductIds.includes(this.productId!);
  }
  
  onAddToWishlist() : void {
    if (!this.isInWishlist()) {
      this.wishlistService.addToWishlist(this.productId!);
      this.wishlistProductIds.push(this.productId!); // Optionally update local list
    } else {
      this._snackBar.open('Product is already in the wishlist.', 'Ok', {duration: 3000,});
      console.log('Product is already in the wishlist.');
      // You can also provide user feedback like a toast message here if required
    }
  }

  ngOnDestroy(): void {
    if (this.unsubscribe$) {
      this.unsubscribe$.unsubscribe();
    }
  }
  mockData(){

    this.selectedImage = '../assets/image/Sieraden.jpeg'

    this.product = {
    productId: "c80da04f-7289-4605-a214-08503ee9eb81",
      title: "Sieraden Etui |",
      price: 4,
      description: "Shkorina Big Habesha Sieraden Set Verguld Met Cadeau Sieraden Etui | Ethiopische sieradenset | Eritrese sieradenset",
      imageUrls: [
        {
          index: 0,
          file: '../assets/image/Tafelloper.avif'
        },
        {
          index: 1,
          file: '../assets/image/Sieraden.jpeg'
        },
        {
          index: 2,
          file:'../assets/image/Sieraden.jpeg'
        },
        {
          index: 3,
          file: '../assets/image/Sieraden.jpeg'
        },
        {
          index: 4,
          file: '../assets/image/Sieraden.jpeg'
        },
      ],
      categoryName: "food",
      isPopular: false,
      CategoryId: "3d412fce-2039-471a-a2a2-1a7c403c0b94",
      sessionId : "3d412fce-2039-471a-a2a2-1a7c403c0b94",
      quantity: 5
      
    }

    this.relatedProducts = [
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
}
