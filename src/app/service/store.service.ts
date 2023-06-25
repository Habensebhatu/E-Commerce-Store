import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product } from '../Models/product.model';
import { Injectable } from '@angular/core';

const STORE_BASE_URL = "https://fakestoreapi.com";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  constructor(private httpClient: HttpClient) {}

  getAllProducts(limit = "12", sort = "desc"): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${STORE_BASE_URL}/products?sort=${sort}&limit=${limit}`
    ).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          // Handle case where API returns 404 (data not found)
          console.log("Data not found");
        } else {
          // Handle other error scenarios
          console.error("An error occurred:", error.message);
        }
        return throwError("Error occurred while fetching products.");
      })
    );
  }
}
