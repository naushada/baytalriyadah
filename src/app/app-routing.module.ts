import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyNewShipmentComponent } from './shipping/my-new-shipment/my-new-shipment.component';
import { ShippingMainComponent } from './shipping/shipping-main/shipping-main.component';

const routes: Routes = [
  {path:'', component:ShippingMainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
