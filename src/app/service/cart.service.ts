import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../Models/cart.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
 
  cart = new BehaviorSubject<Cart>({ items: [] });

  constructor(private _snackBar: MatSnackBar) {
    this.loadCartFromLocalStorage();
    console.log("itmes", this.cart.value.items)
   }

   private loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart.next(JSON.parse(storedCart));
    }
  }
  private saveCartToLocalStorage(cart: Cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(item: CartItem): void {
    console.log('itemm', item);
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.productId === item.productId);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    
    const updatedCart = { items };
    this.cart.next(updatedCart);
    this.saveCartToLocalStorage(updatedCart);

    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
   
  }
  
  
  getTotal(items: CartItem[]): number {
    return items.map((item)=>
      item.price * item.quantity).reduce((prev,current)=> prev + current, 0)
    
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.productId !== item.productId
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });

    
  }
}
