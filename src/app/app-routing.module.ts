import { NgModule } from '@angular/core';

import { CartComponent } from "./components/cart/cart.component";
import { DatailProductComponent } from "./components/datail-product/datail-product.component";
import { PaymentSuccessComponent } from "./stripe/payment-success/payment-success.component";
import { PaymentCancelledComponent } from "./stripe/payment-cancelled/payment-cancelled.component";
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ShopComponent } from './components/product-display-components/shop/shop.component';

const routes: Routes = [
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "product/:productId",
    component:  DatailProductComponent,
  },
  {
    path: "home",
    component: HomepageComponent,
  },
  { path: "", redirectTo: "home", pathMatch: "full" },
  
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'Register', component:  RegisterComponent},
  { path: 'login', component:   LoginComponent},
  { path: 'wishlist', component:    WishlistComponent},
  { path: 'contactUs', component:   ContactUsComponent},
  { path: 'aboutUs', component:    AboutUsComponent},
  { path:  "shop/:name",component:   ShopComponent},
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
