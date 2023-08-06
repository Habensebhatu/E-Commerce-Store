import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BehaviorSubject, Observable, min, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { Product} from "../Models/product.model";
import { Category } from "../Models/category.Model";
import { DecimalPipe } from "@angular/common";


const STORE_BASE_URL = "https://fakestoreapi.com";


@Injectable({
  providedIn: "root",
})
export class StoreService {
  private readonly apiUrl = 'https://localhost:7087/api/Product';
  private readonly apiUrlCategory = 'https://localhost:7087/api/Category';
  getAllProducts = false;
  constructor(private httpClient: HttpClient) { }
  private shouldGetAllProducts = false;
  private showDataSubject = new BehaviorSubject<string>('');
  public showData$ = this.showDataSubject.asObservable();

  changeShowData(value: string): void {
    
    this.showDataSubject.next(value);
  }

  setAllProducts(value: boolean) {
    this.shouldGetAllProducts = value;
  }

  isAllProducts() {
    return this.shouldGetAllProducts;
  }


  getAllCategories(): Observable<Array<string>> {
    return this.httpClient.get<Array<string>>(
      `${STORE_BASE_URL}/products/categories`
    );
  }

  getCatogories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.apiUrlCategory);
  }

  getProductBYCategory(category: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/category/${category}`);
  }
  
  getProductBYPrice(minNumber: number, maxNumber: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}/filterPrice/${minNumber}/${maxNumber}`);
}


  getProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${this.apiUrl}`);
  }

  getProductsById(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.apiUrl}/${productId}`);
  }
}
