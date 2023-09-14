export interface Cart {
      items: Array<Product>;
    }
 export interface Product {
   productId: string;
   CategoryId: string;
    title: string;
     price: number;
    categoryName: string;
    description: string;
    imageUrls: ImageUpdateModel[];
     quantity: number;
     sessionId : string;
     isPopular: boolean;
     

  }

  export interface CartI {
    items: Array<ProductAddCart>;
  }
  export interface ProductAddCart {
    productId: string;
    CategoryId: string;
     title: string;
      price: number;
     categoryName: string;
     description: string;
     imageUrl: string;
      quantity: number;
      sessionId : string;
 
   }

   export interface ImageUpdateModel {
    index: number;
    file: string;
  }
  
