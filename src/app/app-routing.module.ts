import { NgModule } from '@angular/core';
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { DatailProductComponent } from "./pages/home/components/datail-product/datail-product.component";
import { PaymentSuccessComponent } from "./stripe/payment-success/payment-success.component";
import { PaymentCancelledComponent } from "./stripe/payment-cancelled/payment-cancelled.component";
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  {
    path: "home/:name",
    component: HomeComponent,
  },
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "cart",
    component: CartComponent,
  },
  {
    path: "product/:productId",
    component:  DatailProductComponent,
  },
  {
    path: "first",
    component: HomepageComponent,
  },
  { path: "", redirectTo: "first", pathMatch: "full" },
  
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancelled', component: PaymentCancelledComponent },
  { path: 'Register', component:  RegisterComponent},
  { path: 'login', component:   LoginComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
