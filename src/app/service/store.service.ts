import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Product, ProductFakeApi } from "../Models/product.model";
import { Category } from "../Models/category.Model";


const STORE_BASE_URL = "https://fakestoreapi.com";


@Injectable({
  providedIn: "root",
})
export class StoreService {
  private readonly apiUrl = 'https://localhost:7087/api/Product';
  private readonly apiUrlCategory = 'https://localhost:7087/api/Category';
  private products: ProductFakeApi[] = [];
  getproductToggel = false;
  constructor(private httpClient: HttpClient) { }

  // getAllProducts(
  //   limit = "12",
  //   sort = "desc",
  //   category?: string
  // ): Observable<Array<ProductFakeApi>> {
  //   console.log("categoty", category)
  //   return this.httpClient.get<Array<ProductFakeApi>>(
  //     `${STORE_BASE_URL}/products${category ? "/category/" + category : ""
  //     }?sort=${sort}&limit=${limit}`
  //   );
  // }

  // getProducts(): Observable<Product[]>{
  //   // const products = localStorage.getItem('products');
  //   // if (products) {
  //   //   this.products = JSON.parse(products);
  //   // } 
  //   //   return [...this.products];
  //   // return this.http.get<Product[]>(`${this.apiUrl}`);
  //     const observable = this.httpClient.get<Product[]>(this.apiUrl);

  // observable.subscribe({
  //   next: pruducts => {
  //     this.products = pruducts;
  //     console.log("pppprprpr", pruducts)
  //     // localStorage.setItem('categories', JSON.stringify(categories));
  //   },
  //   error: error => {
  //     console.error('Error getting categories: ', error);
  //   }
  // });
  // return observable;
  // }
  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }

  getCatogories(): Observable<Category[]> {
    // const observable = this.httpClient.get<Category[]>(this.apiUrl);
  
    // observable.subscribe({
    //   next: categories => {
    //     // this.categories = categories;
    //     // localStorage.setItem('categories', JSON.stringify(categories));
    //   },
    //   error: error => {
    //     console.error('Error getting categories: ', error);
    //   }
    // });
  
    // return observable;
    return this.httpClient.get<Category[]>(this.apiUrlCategory);
  }
  getProductBYCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/category/${category}`);
}
 
 getProducts(): Observable<Product[]> {
  return this.httpClient.get<Product[]>(`${this.apiUrl}`);
 }
}
