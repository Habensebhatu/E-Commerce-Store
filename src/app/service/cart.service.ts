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
     sessionId: string ;

    constructor(private _snackBar: MatSnackBar, private httpClient: HttpClient) {
        this.sessionId = this.getSessionId();
        this.loadCartFromServer();
    }

    // Get existing sessionId or generate a new one
  private getSessionId(): string {
    let sessionId = localStorage.getItem('sessionId');
    console.log("existingsessionId", sessionId)
    console.log("check",!sessionId)
    if (!sessionId) {
      sessionId = this.generateSessionId();
      localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }

  private generateSessionId(): string {
    // Generate a simple random session ID, you can refine this further
    return Math.random().toString(36).substr(2, 9);
  }

    show(): void {
        this._showMenu.next();
    }

    loadCartFromServer() {
        console.log("getsessionID", this.sessionId)
        this.httpClient.get<ProductAddCart[]>(`${this.apiUrl}?sessionId=${this.sessionId}`).subscribe(items => {
            const updatedcart = { items: items };
            this.cart.next(updatedcart);
        });
    }

    private saveCartToLocalStorage(cart: Cart) {
        console.log("cart", cart);
        localStorage.setItem('cart', JSON.stringify(cart));
    }


    addToCart(item: ProductAddCart): void {
        item.sessionId = this.sessionId;
        console.log(" AddsessionId ",  item.sessionId )
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
        item.sessionId = this.sessionId;
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
        return items.map((item) =>
            item.price * item.quantity).reduce((prev, current) => prev + current, 0)

    }



    clearCart(): void {
        this.httpClient.delete<any>(`${this.apiUrl}?sessionId=${this.sessionId}`).subscribe(
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



    removeFromCart(item: Product, updateCart = true): void {
        this.httpClient.delete(`${this.apiUrl}/${item.productId}?sessionId=${this.sessionId}`).subscribe(
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




    removeQuantity(item: ProductAddCart): void {
        console.log("habenbebbebebebebebebebeb")
        this.httpClient.put<ProductAddCart>(
            `${this.apiUrl}/${item.productId}?sessionId=${this.sessionId}`,
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
