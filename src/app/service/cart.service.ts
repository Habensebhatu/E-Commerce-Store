import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Cart, CartI, Product, ProductAddCart } from '../Models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'https://localhost:7087/api/Cart';
  cart = new BehaviorSubject<CartI>({ items: [] });
  private _showMenu = new Subject<void>();
  showMenu$ = this._showMenu.asObservable();

  constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) {
    // this.loadCartFromServer();
    // this.loadCartFromLocalStorage() 
    this.loadCartFromServer();
   }
  
   show(): void {
    this._showMenu.next();
  }
  //  private loadCartFromLocalStorage() {
  //   console.log("testestest444444")
  //   const storedCart = localStorage.getItem('cart');
  //   if (storedCart) {
  //     // console.log("storedCart", JSON.parse(storedCart))
  //     this.cart.next(JSON.parse(storedCart));
  //   }
  // }

  loadCartFromServer() {
    this.httpClient.get<ProductAddCart []>(`${this.apiUrl}`).subscribe(items => {
        const updatedcart = { items: items };
        this.cart.next(updatedcart);
    });
}

  private saveCartToLocalStorage(cart: Cart) {
    console.log("cart", cart);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // addToCart(item: Product): void {
  //   const items = [...this.cart.value.items];
  //   const itemInCart = items.find((_item) => _item.productId === item.productId);
  //   if (itemInCart) {
  //     itemInCart.quantity += 1;
  //   } else {
  //     items.push(item);
  //   }
  //   const updatedCart = { items };
  //   this.cart.next(updatedCart);
  //   this.saveCartToLocalStorage(updatedCart);
  //   this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
   
  // }
  addToCart(item: ProductAddCart ): void {
    console.log("sdghhdhhjdg223333", item)
    this.httpClient.post<ProductAddCart>(`${this.apiUrl}`, item).subscribe(
        response => {
            const items = [...this.cart.value.items];
            const itemInCart = items.find((_item) => _item.productId === item.productId);
            if (itemInCart) {
                itemInCart.quantity += 1;
            } else {
                items.push(item);
            }
            const updatedCart = { items };
            this.cart.next(updatedCart);
            this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
        },
        error => {
            console.error('Error adding product to cart', error);
        }
    );
}

addToCartFromProductDetail(item: ProductAddCart): void {
  this.httpClient.post<Product>(`${this.apiUrl}`, item).subscribe(
      response => {
          const items = [...this.cart.value.items];
          const itemInCart = items.find((_item) => _item.productId === item.productId);
          if (itemInCart) {
              itemInCart.quantity += item.quantity;
          } else {
              items.push(item);
          }
          const updatedCart = { items };
          this.cart.next(updatedCart);
          this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
      },
      error => {
          console.error('Error adding product to cart', error);
      }
  );
}
  
  
  getTotal(items: ProductAddCart[]): number {
    return items.map((item)=>
      item.price * item.quantity).reduce((prev,current)=> prev + current, 0)
    
  }

  // clearCart(): void {
  //   this.cart.next({ items: [] });
  //   localStorage.removeItem('cart');
  //   this._snackBar.open('Cart is cleared.', 'Ok', {
  //     duration: 3000,
  //   });
  // }

  clearCart(): void {
    this.httpClient.delete<any>(`${this.apiUrl}`).subscribe(
        response => {
            this.cart.next({ items: [] });
            this._snackBar.open(response.message, 'Ok', {
                duration: 3000,
            });
        },
        error => {
            console.error('Error clearing the cart', error);
        }
    );
}

  // removeFromCart(item: Product, updateCart = true): Product[] {
  //   const filteredItems = this.cart.value.items.filter(
  //     (_item) => _item.productId !== item.productId
  //   );
  //   if (updateCart) {
  //     this.cart.next({ items: filteredItems });
  //     const updatedCarts = { items: filteredItems  };
  //     this.saveCartToLocalStorage(updatedCarts);
  //     this._snackBar.open('1 item removed from cart.', 'Ok', {
  //       duration: 3000,
  //     });
  //   }

  //   return filteredItems;
  // }

  removeFromCart(item: Product, updateCart = true): void {
    this.httpClient.delete(`${this.apiUrl}/${item.productId}`).subscribe(
        response => {
            const filteredItems = this.cart.value.items.filter(
                (_item) => _item.productId !== item.productId
            );
            
            if (updateCart) {
                this.cart.next({ items: filteredItems });
                this._snackBar.open('1 item removed from cart.', 'Ok', {
                    duration: 3000,
                });
            }
        },
        error => {
            console.error('Error removing product from cart', error);
        }
    );
}


  // removeQuantity(item: Product): void {
  //   let itemForRemoval!: Product;
  //   let filteredItems = this.cart.value.items.map((_item) => {
  //     if (_item.productId === item.productId) {
  //       _item.quantity--;
  //       if (_item.quantity === 0) {
  //         itemForRemoval = _item;
  //       }
  //     }
  //     return _item;
  //   });

  //   if (itemForRemoval) {
  //     filteredItems = this.removeFromCart(itemForRemoval, false);
  //   }

  //   this.cart.next({ items: filteredItems });
  //   const updatedCarts = { items: filteredItems  };
  //   this.saveCartToLocalStorage(updatedCarts);
  //   this._snackBar.open('1 item removed from cart.', 'Ok', {
  //     duration: 3000,
  //   });

    
  // }

  removeQuantity(item: ProductAddCart): void {
    this.httpClient.put<ProductAddCart >(
      `${this.apiUrl}/${item.productId}`, 
      {}  
  ).subscribe(
        updatedCart => {
            const filteredItems = this.cart.value.items.map((_item) => {
                if (_item.productId === updatedCart.productId) {
                    return updatedCart;
                }
                return _item;
            }).filter(_item => _item.quantity > 0);  // filter out items with zero quantity
            
            this.cart.next({ items: filteredItems });
            this._snackBar.open('1 item quantity reduced.', 'Ok', {
                duration: 3000,
            });
        },
        error => {
            console.error('Error updating product quantity', error);
        }
    );
}

}
