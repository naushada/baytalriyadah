import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyNewShipmentComponent } from './shipping/my-new-shipment/my-new-shipment.component';
import { ShippingMainComponent } from './shipping/shipping-main/shipping-main.component';
import { LoginComponent } from './view/login/login.component';

const routes: Routes = [
  {path:'bayt', component:ShippingMainComponent},
  {path:'', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
