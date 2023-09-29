import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import { ProductBoxComponent } from './pages/home/components/product-box/product-box.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaymentSuccessComponent } from './stripe/payment-success/payment-success.component';
import { PaymentCancelledComponent } from './stripe/payment-cancelled/payment-cancelled.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { DatailProductComponent } from './pages/home/components/datail-product/datail-product.component';
import { StoreService } from './service/store.service';
import { CartService } from './service/cart.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './components/homepage/homepage.component';
import { register } from 'swiper/element/bundle';
import { ProductsSliderComponent } from './pages/home/components/products-slider/products-slider.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
// register Swiper custom elements
register();





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsHeaderComponent,
    FiltersComponent,
    ProductBoxComponent,
    CartComponent,
    FooterComponent,
    DatailProductComponent,
    PaymentSuccessComponent,
    PaymentCancelledComponent,
    HomepageComponent,
    ProductsSliderComponent,
    RegisterComponent,
    LoginComponent,
    WishlistComponent,
 
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatTreeModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
   
  ],
  providers: [CartService, StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }






