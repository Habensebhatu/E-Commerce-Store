import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../Models/product.model";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private apiUrl = "https://localhost:7087/api/Wishlist/AddToWishList";
  private apiUrlGet = "https://localhost:7087/api/Wishlist/GetWishlistProducts";
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {}

  addToWishlist(productId: string): void {
    console.log("prduct", typeof productId);
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token");
    if (token) {
      headers = headers.set("Authorization", `Bearer ${token}`);
      console.log("headers", headers);
    }
     this.httpClient.post(this.apiUrl, { productId }, { headers }).subscribe(
      response => {
        this._snackBar.open('1 item added to  wishList .', 'Ok', {duration: 3000,});
      }
    );
  }

  getWishlistProducts() : Observable<Product[]>{
    let headers = new HttpHeaders();
    const token = localStorage.getItem("token");
    if (token) {
      headers = headers.set("Authorization", `Bearer ${token}`);
    }
    return this.httpClient.get<Product[]>(this.apiUrlGet, { headers });
  }
}
