export interface Cart {
    items: Array<CartItem>;
  }
  
  export interface CartItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    id: number;
    imageUrl: string
    productId: string
    
  }