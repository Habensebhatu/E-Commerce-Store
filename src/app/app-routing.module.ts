import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./pages/home/home.component";
import { CartComponent } from "./pages/cart/cart.component";
import { FirstPageComponent } from "./FirstPage/first-page/first-page.component";
import { DatailProductComponent } from "./pages/home/components/datail-product/datail-product.component";
import { PaymentSuccessComponent } from "./stripe/payment-success/payment-success.component";
import { PaymentCancelledComponent } from "./stripe/payment-cancelled/payment-cancelled.component";

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
    path: "first",
    component: FirstPageComponent,
  },
  {
    path: "product/:productId",
    component:  DatailProductComponent,
  },

  { path: "", redirectTo: "first", pathMatch: "full" },
  
  { path: 'payment-success', component: PaymentSuccessComponent },
  { path: 'payment-cancelled', component: PaymentCancelledComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
